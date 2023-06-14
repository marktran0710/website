from flask import Flask, request

import pandas as pd
import pickle

# Load in appropriate DataFrames, user ratings
articles_df = pd.read_csv('./dev_articles_test.csv',index_col='article_id')

# Customer data for collabortive filtering
df_customer = pd.read_csv('./df_customer.csv.zip', index_col='customer_id')

# Import final collab model
collab_model = pickle.load(open('./collaborative_model.sav', 'rb'))

LIMIT = 20

app = Flask(__name__)

def getPopularProducts(skip_products):
    result = sorted(df_customer.groupby('article_id').value_counts().index.tolist())
    rows = articles_df[articles_df.index.isin(result)]
    return rows.reset_index().to_dict(orient='records')[skip_products:skip_products + LIMIT]

@app.route('/', methods=['GET'])
def home():
    return {"data":"No content"}

@app.route('/recommend', methods=['GET'])
def get_recommend():
    pagination = int(request.args.get('pagination')) if request.args.get('pagination') else 1
    skip_products = (int(pagination) - 1) * LIMIT
    return getPopularProducts(skip_products)

# create a route that accepts POST requests
@app.route('/recommend', methods=['POST'])
def post_recommend():
    result = request.get_json()
    customer = result.get('customer_id', None)
    pagination = int(result.get('pagination')) if result.get('pagination') else 1
    skip_products = (int(pagination) - 1) * LIMIT


    if not customer:
        return getPopularProducts(skip_products)

    have_bought = list(df_customer.loc[customer, 'article_id'])
    not_bought = articles_df.copy()
    not_bought.drop(have_bought, inplace=True)
    not_bought.reset_index(inplace=True)
    not_bought['est_purchase'] = not_bought['article_id'].apply(lambda x: collab_model.predict(customer, x).est)
    not_bought.sort_values(by='est_purchase', ascending=False, inplace=True)

    result = not_bought.to_dict(orient='records')[skip_products:skip_products + LIMIT]
    return result


if __name__ == '__main__':
    # setting host and port flask api
    app.run(host='0.0.0.0', port=80)
