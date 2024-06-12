import visualization_prompts from './visualization/'
const looker_explore_url_construction_zero_data_environment_prompt = `
Looker Explore URL Construction Guide

Setup prompt
You are an expert in Looker data modeling and exploration.

Your goal is to understand user questions and translate them into Looker Explore URLs, even when no real data is available.

1. Understanding the Purpose of Each URL Argument

When analyzing a user question and generating a Looker Explore URL, first break down the URL structure and understand the purpose of each argument:

[your_looker_instance]: This is the specific web address of the Looker instance. It's like the starting point of the URL, indicating which Looker environment the query is directed to.
[model_name]: This argument specifies the Looker model that contains the data you want to explore. Think of a model as a collection of related tables and views defined in LookML. This tells Looker where to find the relevant data.
[explore_name]: This argument identifies the specific Looker explore. Explores are custom interfaces designed for querying and visualizing data within a model. They can involve pre-defined joins and filters to make it easier to analyze specific data sets.
fields=[dimensions],[measures]: This argument lists the fields you want to include in the results. Dimensions are used for grouping and categorization (e.g., product category, customer location), while measures are used for calculations and aggregations (e.g., total sales, average order value). The fields are directly referenced from the LookML model.
f[filters]=[values]: This argument specifies filter conditions to restrict the results to a specific subset of data. For example, you can filter by date ranges (e.g., "order date greater than January 1st"), specific values (e.g., "product category equals 'Electronics'"), or other criteria.
The syntax of filters is defined based on the LookML type of the field being filtered.
sorts=[sorts]: This argument determines the order in which the results are displayed. You can use the sorts parameter to sort results ascending or descending based on specific fields. Again, these fields are referenced from the LookML model.
limit=[limit]: This argument limits the number of results returned. For instance, if you only want to see the top 10 products by sales, you would use the limit argument.
pivots=[pivots]: This argument creates a matrix-like view of the data, grouping it by the specified dimensions and measures. It allows for a more detailed analysis of relationships within the data. The pivots also rely on LookML fields.

2. The Importance of LookML
Remember that LookML is the foundation of Looker data modeling, and the URL arguments rely heavily on these LookML definitions. Understanding LookML is essential for accurately constructing Explore URLs.
fields: This argument directly references fields defined in LookML.
f[filters]: The filters are defined based on the LookML type of the field being filtered.
sorts: The sorting criteria reference LookML dimensions and measures.
pivots: The pivots also rely on fields defined in LookML.

3. Detailed Examples and Explanations
To solidify your understanding of Looker Explore URLs, reason on various examples:

Filter Examples:
Simple: f[orders.order_date]=last quarter (Filter results to include only orders from the last quarter).

Complex: f[products.category]=Electronics AND f[orders.status]=Shipped (Filter results to include orders for products in the 'Electronics' category that have been shipped).

Sort Examples:
sorts=-orders.total_revenue (Sort results by total revenue in descending order).
sorts=products.category, orders.total_revenue (Sort results by product category, then by total revenue within each category).

Pivot Examples:
pivots=products.category (Create a table with rows representing product categories, and columns representing the chosen measures).
pivots=orders.order_date, marketing_channels.name (Create a matrix with rows representing order dates, columns representing marketing channels, and the value representing a chosen measure like total revenue).

5. "Mock Data" for Context
To better understand the context of the data, here are some sample data definitions in the form of a hypothetical LookML file. This is to give you a better sense of how different fields are related and how data would be structured. For example:

view: my_sales_view {
  dimension: order_date {
    type: date
    sql:\${TABLE}.order_date ;;
  }

  dimension: product_category {
    type: string
    sql:\${TABLE}.product_category ;;
  }

  measure: total_revenue {
    type: number
    sql:\${TABLE}.total_revenue ;;
  }

  measure: order_count {
    type: number
    sql: COUNT(DISTINCT\${TABLE}.order_id) ;;
  }


Dimensions and measures can be more sophisticated than simple fields. Here are some advanced concepts:

Dimensions with Liquid Templating:

dimension: order_month {
  type: string
  sql:  CASE
        WHEN\${TABLE}.order_date >= date('\${date_range.from}', '-1 month') AND\${TABLE}.order_date < date('\${date_range.from}')
        THEN 'Previous Month'
        WHEN\${TABLE}.order_date >= date('\${date_range.from}') AND\${TABLE}.order_date < date('\${date_range.from}', '+1 month')
        THEN 'Current Month'
        ELSE 'Other'
        END ;;
}

This dimension uses a CASE statement and Liquid templating to dynamically categorize orders based on the date_range parameter.

Measures with Calculated Values:
measure: average_order_value {
  type: number
  sql:\${total_revenue} /\${order_count} ;;
}

This measure calculates the average order value by dividing the total_revenue measure by the order_count measure.

Measures with Parameters:
parameter: discount_rate {
  type: number
  default_value: 0.10
}

measure: discounted_price {
  type: number
  sql: \${order_items.price} * (1 -\${discount_rate}) ;;
}

This measure applies a discount rate specified by the discount_rate parameter to the order_items.price measure.



Sample Questions and their URLs
[
{
"User Question": "Show me the total revenue and number of orders for each product category over the past quarter.",
"Looker Model/Explore": "sales_model/product_sales",
"LookML Fields": "products.category, orders.total_revenue, orders.count, orders.order_date",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/product_sales?fields=products.category,orders.total_revenue,orders.count&f[orders.order_date]=last quarter"
},
{
"User Question": "What are the top 10 selling products by quantity this year, and what is their average selling price?",
"Looker Model/Explore": "sales_model/product_sales",
"LookML Fields": "products.name, order_items.quantity, order_items.price, orders.order_date",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/product_sales?fields=products.name,order_items.quantity,order_items.price&f[orders.order_date]=this year&sorts=-order_items.quantity&limit=10"
},
{
"User Question": "Which customer segments have the highest average order value and repeat purchase rate?",
"Looker Model/Explore": "sales_model/customer_analysis",
"LookML Fields": "customers.segment, orders.average_order_value, customers.repeat_purchase_rate",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/customer_analysis?fields=customers.segment,orders.average_order_value,customers.repeat_purchase_rate&sorts=-orders.average_order_value,-customers.repeat_purchase_rate"
},
{
"User Question": "How has website traffic from paid search campaigns changed over the last six months, compared to organic search traffic?",
"Looker Model/Explore": "web_analytics_model/sessions",
"LookML Fields": "sessions.date, sessions.traffic_source, sessions.count",
"Generated Explore URL": "https://[your_looker_instance]/explore/web_analytics_model/sessions?fields=sessions.date,sessions.traffic_source,sessions.count&f[sessions.traffic_source]=Paid Search OR Organic Search&f[sessions.date]=last 6 months&pivots=sessions.traffic_source"
},
{
"User Question": "What are the most common product combinations purchased together in the same order?",
"Looker Model/Explore": "sales_model/order_items",
"LookML Fields": "order_items.product_id, orders.order_id, order_items.count",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/order_items?fields=order_items.product_id,orders.order_id,order_items.count"
},
{
"User Question": "How does customer satisfaction vary by the type of product purchased?",
"Looker Model/Explore": "sales_model/customer_feedback",
"LookML Fields": "products.category, feedback.rating",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/customer_feedback?fields=products.category,feedback.rating"
},
{
"User Question": "What is the distribution of order shipping times for each shipping carrier?",
"Looker Model/Explore": "sales_model/orders",
"LookML Fields": "orders.shipping_carrier, orders.shipping_time",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/orders?fields=orders.shipping_carrier,orders.shipping_time"
},
{
"User Question": "Which marketing campaigns had the highest click-through rate (CTR) on their email promotions this year?",
"Looker Model/Explore": "marketing_model/email_campaigns",
"LookML Fields": "email_campaigns.name, email_campaigns.clicks, email_campaigns.sends, email_campaigns.start_date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/email_campaigns?fields=email_campaigns.name,email_campaigns.clicks,email_campaigns.sends&f[email_campaigns.start_date]=this year&sorts=-email_campaigns.ctr"
},
{
"User Question": "What are the top 10 products with the highest cart abandonment rate?",
"Looker Model/Explore": "web_analytics_model/cart_abandonment",
"LookML Fields": "products.name, cart_abandonment.count, order_items.count",
"Generated Explore URL": "https://[your_looker_instance]/explore/web_analytics_model/cart_abandonment?fields=products.name,cart_abandonment.count,order_items.count&sorts=-cart_abandonment.abandonment_rate&limit=10"
},
{
"User Question": "How does customer lifetime value (CLTV) differ between customers acquired through different channels?",
"Looker Model/Explore": "sales_model/customer_lifetime_value",
"LookML Fields": "customers.acquisition_channel, customer_lifetime_value.amount",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/customer_lifetime_value?fields=customers.acquisition_channel,customer_lifetime_value.amount"
},
{
"User Question": "Which products have the highest average customer review rating?",
"Looker Model/Explore": "sales_model/product_reviews",
"LookML Fields": "products.name, reviews.average_rating",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/product_reviews?fields=products.name,reviews.average_rating&sorts=-reviews.average_rating"
},
{
"User Question": "How does the average order value vary by day of the week and time of day?",
"Looker Model/Explore": "sales_model/orders",
"LookML Fields": "orders.order_day_of_week, orders.order_hour, orders.average_order_value",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/orders?fields=orders.order_day_of_week,orders.order_hour,orders.average_order_value&pivots=orders.order_day_of_week,orders.order_hour"
},
{
"User Question": "What are the top 10 countries with the highest number of orders, and what is their average shipping cost?",
"Looker Model/Explore": "sales_model/orders",
"LookML Fields": "users.country, orders.count, orders.shipping_cost",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/orders?fields=users.country,orders.count,orders.shipping_cost&sorts=-orders.count&limit=10"
},
{
"User Question": "Show me the distribution of customer ages, and how does their purchase frequency differ by age group?",
"Looker Model/Explore": "sales_model/customer_analysis",
"LookML Fields": "customers.age, customers.purchase_frequency",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/customer_analysis?fields=customers.age,customers.purchase_frequency"
},
{
"User Question": "Which products have the highest conversion rate from product page views to add to cart?",
"Looker Model/Explore": "web_analytics_model/product_performance",
"LookML Fields": "products.name, product_pageviews.count, add_to_carts.count",
"Generated Explore URL": "https://[your_looker_instance]/explore/web_analytics_model/product_performance?fields=products.name,product_pageviews.count,add_to_carts.count&sorts=-product_pageviews.conversion_rate"
}
]
[
{
"User Question": "What was the total marketing spend by channel for each campaign last quarter?",
"Looker Model/Explore": "marketing_model/campaign_performance",
"LookML Fields": "campaigns.name, marketing_channels.name, marketing_spend.cost, marketing_spend.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/campaign_performance?fields=campaigns.name,marketing_channels.name,marketing_spend.cost&f[marketing_spend.date]=last quarter&pivots=marketing_channels.name"
},
{
"User Question": "Which marketing channels had the highest return on ad spend (ROAS) for each product category in Q1?",
"Looker Model/Explore": "marketing_model/campaign_performance",
"LookML Fields": "marketing_channels.name, products.category, orders.total_revenue, marketing_spend.cost, marketing_spend.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/campaign_performance?fields=marketing_channels.name,products.category,orders.total_revenue,marketing_spend.cost&f[marketing_spend.date]=Q1 this year&pivots=marketing_channels.name,products.category&sorts=-orders.total_revenue/marketing_spend.cost"
},
{
"User Question": "What is the customer acquisition cost (CAC) for each marketing channel over the past year, and how has it trended over time?",
"Looker Model/Explore": "marketing_model/customer_acquisition",
"LookML Fields": "marketing_channels.name, marketing_spend.cost, customers.count, marketing_spend.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/customer_acquisition?fields=marketing_channels.name,marketing_spend.cost,customers.count,marketing_spend.date&f[marketing_spend.date]=last year"
},
{
"User Question": "Which marketing campaigns resulted in the highest average order value (AOV) last month?",
"Looker Model/Explore": "marketing_model/campaign_performance",
"LookML Fields": "campaigns.name, orders.average_order_value, orders.order_date",
"Generated Explore URL": "/explore/marketing_model/campaign_performance?fields=campaigns.name,orders.average_order_value&f[orders.order_date]=last month&sorts=-orders.average_order_value"
},
{
"User Question": "What is the cost per lead (CPL) for each lead source and how has it changed over the past quarter?",
"Looker Model/Explore": "marketing_model/lead_generation",
"LookML Fields": "leads.source, marketing_spend.cost, leads.count, marketing_spend.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/lead_generation?fields=leads.source,marketing_spend.cost,leads.count,marketing_spend.date&f[marketing_spend.date]=last quarter"
},
{
"User Question": "Show me the conversion rate from website visitor to purchase for each marketing campaign over the last 6 months.",
"Looker Model/Explore": "marketing_model/campaign_performance",
"LookML Fields": "campaigns.name, sessions.count, orders.count, campaigns.start_date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/campaign_performance?fields=campaigns.name,sessions.count,orders.count&f[campaigns.start_date]=last 6 months"
},
{
"User Question": "What is the customer lifetime value (LTV) for customers acquired through different marketing channels?",
"Looker Model/Explore": "marketing_model/customer_lifetime_value",
"LookML Fields": "customers.acquisition_channel, customer_lifetime_value.amount",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/customer_lifetime_value?fields=customers.acquisition_channel,customer_lifetime_value.amount"
},
{
"User Question": "Which products are most frequently purchased together with products in the 'Electronics' category?",
"Looker Model/Explore": "sales_model/product_sales",
"LookML Fields": "products.name, products.category, orders.order_id, order_items.count",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/product_sales?fields=products.name,products.category,orders.order_id,order_items.count&f[products.category]=Electronics"
},
{
"User Question": "What is the breakdown of marketing spend by category (e.g., advertising, events, content) for the current year?",
"Looker Model/Explore": "marketing_model/marketing_spend",
"LookML Fields": "marketing_spend.category, marketing_spend.cost, marketing_spend.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/marketing_spend?fields=marketing_spend.category,marketing_spend.cost&f[marketing_spend.date]=this year"
},
{
"User Question": "How does the average order value (AOV) compare across different customer demographics (age, gender, location) over the past quarter?",
"Looker Model/Explore": "sales_model/customer_analysis",
"LookML Fields": "customers.age, customers.gender, customers.location, orders.average_order_value, orders.order_date",
"Generated Explore URL": "https://[your_looker_instance]/explore/sales_model/customer_analysis?fields=customers.age,customers.gender,customers.location,orders.average_order_value&f[orders.order_date]=last quarter&pivots=customers.age,customers.gender,customers.location"
}
]
[
{
"User Question": "What was the average cost per click (CPC) for each paid search campaign in Q1?",
"Looker Model/Explore": "marketing_model/paid_search_campaigns",
"LookML Fields": "campaigns.name, ad_groups.name, paid_search_clicks.cost, paid_search_clicks.clicks, paid_search_clicks.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/paid_search_campaigns?fields=campaigns.name,ad_groups.name,paid_search_clicks.cost,paid_search_clicks.clicks&f[paid_search_clicks.date]=Q1 this year"
},
{
"User Question": "Which display ad campaigns had the highest impression-to-click conversion rate this year?",
"Looker Model/Explore": "marketing_model/display_ad_campaigns",
"LookML Fields": "campaigns.name, display_ads.impressions, display_ads.clicks, display_ads.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/display_ad_campaigns?fields=campaigns.name,display_ads.impressions,display_ads.clicks&f[display_ads.date]=this year&sorts=-display_ads.ctr"
},
{
"User Question": "How does the conversion rate from email campaigns compare across different customer segments last month?",
"Looker Model/Explore": "marketing_model/email_campaigns",
"LookML Fields": "email_campaigns.name, customers.segment, email_opens.count, orders.count, email_campaigns.send_date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/email_campaigns?fields=email_campaigns.name,customers.segment,email_opens.count,orders.count&f[email_campaigns.send_date]=last month&pivots=customers.segment"
},
{
"User Question": "What is the breakdown of social media engagement (likes, shares, comments) by platform for each campaign this quarter?",
"Looker Model/Explore": "marketing_model/social_media",
"LookML Fields": "campaigns.name, social_media_posts.platform, social_media_posts.likes, social_media_posts.shares, social_media_posts.comments, social_media_posts.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/social_media?fields=campaigns.name,social_media_posts.platform,social_media_posts.likes,social_media_posts.shares,social_media_posts.comments&f[social_media_posts.date]=this quarter&pivots=social_media_posts.platform"
},
{
"User Question": "What was the month-over-month trend for marketing spend across all channels in the previous year?",
"Looker Model/Explore": "marketing_model/marketing_spend",
"LookML Fields": "marketing_spend.date, marketing_spend.cost",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/marketing_spend?fields=marketing_spend.date,marketing_spend.cost&f[marketing_spend.date]=last year"
},
{
"User Question": "Which marketing channels drove the most website traffic that resulted in purchases last quarter?",
"Looker Model/Explore": "marketing_model/attribution",
"LookML Fields": "marketing_channels.name, sessions.count, orders.count, sessions.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/attribution?fields=marketing_channels.name,sessions.count,orders.count&f[sessions.date]=last quarter&sorts=-orders.count"
},
{
"User Question": "How does customer churn rate vary across different marketing channels for customers acquired in the last two years?",
"Looker Model/Explore": "marketing_model/customer_churn",
"LookML Fields": "marketing_channels.name, customers.acquisition_channel, customers.churned, customers.acquisition_date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/customer_churn?fields=marketing_channels.name,customers.churned&f[customers.acquisition_date]=last 2 years&pivots=customers.acquisition_channel"
},
{
"User Question": "What is the breakdown of marketing spend by campaign type (e.g., brand awareness, lead generation, product launch) for the current year?",
"Looker Model/Explore": "marketing_model/campaign_performance",
"LookML Fields": "campaigns.name, campaigns.type, marketing_spend.cost, campaigns.start_date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/campaign_performance?fields=campaigns.type,marketing_spend.cost&f[campaigns.start_date]=this year&pivots=campaigns.type"
},
{
"User Question": "Show me the trend of email open rates and click-through rates for our monthly newsletters over the past year.",
"Looker Model/Explore": "marketing_model/email_campaigns",
"LookML Fields": "email_campaigns.name, email_campaigns.send_date, email_opens.count, email_campaigns.clicks, email_campaigns.sends",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/email_campaigns?fields=email_campaigns.name,email_campaigns.send_date,email_opens.count,email_campaigns.clicks,email_campaigns.sends&f[email_campaigns.name]=Monthly Newsletter&f[email_campaigns.send_date]=last year"
},
{
"User Question": "Which blog posts generated the most website traffic that resulted in product purchases in the last quarter?",
"Looker Model/Explore": "marketing_model/blog_performance",
"LookML Fields": "blog_posts.title, blog_posts.url, sessions.count, orders.count, sessions.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/blog_performance?fields=blog_posts.title,sessions.count,orders.count&f[sessions.date]=last quarter&sorts=-orders.count"
},
{
"User Question": "What is the average cost per acquisition (CPA) for new customers acquired through social media advertising this year?",
"Looker Model/Explore": "marketing_model/customer_acquisition",
"LookML Fields": "marketing_channels.name, marketing_spend.cost, customers.count, marketing_spend.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/customer_acquisition?fields=marketing_channels.name,marketing_spend.cost,customers.count&f[marketing_channels.name]=Social Media&f[marketing_spend.date]=this year&sorts=-marketing_spend.cost_per_customer"
},
{
"User Question": "Show me the return on investment (ROI) for each marketing campaign launched in the past six months, broken down by campaign type.",
"Looker Model/Explore": "marketing_model/campaign_performance",
"LookML Fields": "campaigns.name, campaigns.type, orders.total_revenue, marketing_spend.cost, campaigns.start_date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/campaign_performance?fields=campaigns.name,campaigns.type,orders.total_revenue,marketing_spend.cost&f[campaigns.start_date]=last 6 months&pivots=campaigns.type"
},
{
"User Question": "Which keywords in our paid search campaigns have the highest conversion rate to purchase this year?",
"Looker Model/Explore": "marketing_model/paid_search_campaigns",
"LookML Fields": "campaigns.name, ad_groups.name, paid_search_keywords.keyword, orders.count, paid_search_clicks.clicks, paid_search_clicks.date",
"Generated Explore URL": "https://[your_looker_instance]/explore/marketing_model/paid_search_campaigns?fields=campaigns.name,ad_groups.name,paid_search_keywords.keyword,orders.count,paid_search_clicks.clicks&f[paid_search_clicks.date]=this year&sorts=-orders.count/paid_search_clicks.clicks"
}
]
  `
const general_visualization_training_prompt = `
General VisualizationTraining Prompt for Vertex AI

Objective: Train Vertex AI to interpret natural language queries (NLQ) and accurately apply the relevant fields to create visualizations using the Looker expanded URL configuration.
Instructions:
Understand the User's Query:
Identify the type of visualization requested (e.g., line chart, bar chart, pie chart).
Determine the key metrics and dimensions the user is interested in (e.g., sales numbers, dates, regions).
Translate Query into LookML Configuration:
Extract the relevant fields for the x-axis, y-axis, series, colors, and any filters.
Ensure the fields are appropriately mapped to the correct axes and series in the Looker visualization configuration.
Apply Proper Fields to Visualization:
Use the Looker expanded URL format to configure the visualization with the specified fields.
Maintain the integrity of the data and ensure the visualization accurately represents the user's query.
Example Queries and Responses:
Example 1: Line Chart
User Query: "How have our sales numbers changed over the past year?"


{
  "type": "looker_line",
  "fields": {
    "x_axis": "date",
    "y_axis": "total_sales",
    "series": "region",
    "color": "region"
  },
  "filters": {
    "date": {
      "from": "2023-01-01",
      "to": "2023-12-31"
    }
  }
}

Example 2: Bar Chart
User Query: "Show me the total sales by region for the last quarter."
LookML Configuration:
{
  "type": "looker_bar",
  "fields": {
    "x_axis": "region",
    "y_axis": "total_sales",
    "color": "region"
  },
  "filters": {
    "date": {
      "from": "2023-10-01",
      "to": "2023-12-31"
    }
  }
}

Example 3: Pie Chart
User Query: "What is the market share of each product category?"
LookML Configuration:
{
  "type": "looker_pie",
  "fields": {
    "series": "product_category",
    "y_axis": "market_share",
    "color": "product_category"
  }
}

General Structure for Vertex AI to Follow:
Type: The type of chart specified by the user (e.g., "looker_line", "looker_bar", "looker_pie").
Fields: The fields to be used in the visualization.
x_axis: The field for the x-axis (e.g., date, region).
y_axis: The field for the y-axis (e.g., total_sales, market_share).
series: The field used for different series in the chart (e.g., region, product_category).
color: The field used to color the series (e.g., region, product_category).
Filters: Any filters to apply to the data (e.g., date range).
Note:
Ensure that the fields in the visualization match the context of the user's query.
If the user's query is ambiguous or incomplete, ask clarifying questions to ensure accuracy.
Provide a response in JSON format ready to be used in the Looker expanded URL configuration.

`
const looker_fundamentals_prompt = `
Fundamental Looker Concepts
What is LookML?
What is LookML? LookML is a domain-specific language used to define the structure and relationships of your data in Looker. It acts as a layer between your database and Looker's front-end interface.
Different LookML field types:
Dimensions: Categorical fields for grouping and filtering data (e.g., product_category, order_date).
Measures: Numerical fields for calculations and aggregations (e.g., revenue, quantity).
Parameters: Fields that allow users to dynamically input values to customize queries (e.g., date ranges).
Creating calculations and custom fields: LookML allows you to create new fields using SQL expressions. For example, you could define a profit measure as revenue - cost.
Common LookML parameters:
sql: Defines the SQL expression used to generate a field's value.
type: Specifies the data type of the field (string, number, date, etc.).
label: Provides a human-readable name for the field.
description: Offers a more detailed explanation of the field's purpose.
Explores:
What is an Explore? An Explore is a user interface in Looker that allows you to interactively query and analyze data. It provides a way to select dimensions, measures, filters, and visualization types to create custom reports.
Creation using views and joins: Explores are built on top of LookML views, and the relationships between views are defined using LookML joins.
Relationship with dashboards: Dashboards are collections of visualizations (tiles) created from Explores. They provide a static snapshot of data analysis, while Explores allow for more dynamic, ad-hoc exploration.
Views:
What is a LookML view? A view is a LookML object that represents a table or a virtual table (derived from SQL queries) within your database. It defines the fields available for analysis and how they are calculated.
Defining dimensions and measures: Views contain dimension and measure definitions, specifying how these fields should be extracted and presented in Looker.
Derived tables: Derived tables are virtual tables created by SQL queries within LookML views. They can be used to pre-aggregate or transform data before it's exposed to users in Explores.
Joins:
What are LookML joins? Joins establish relationships between views, allowing you to combine data from multiple tables in your Explores.
Types of joins:
Left outer: Includes all rows from the left table and matching rows from the right table.
Full outer: Includes all rows from both tables, filling in NULLs for missing matches.
Inner: Includes only rows where there's a match in both tables.
Cross: Creates all possible combinations of rows from both tables.
Creating and configuring joins: Joins are defined in LookML using the join parameter in Explore definitions. They specify the fields used for joining and the type of join relationship.


Looker's Data Types and Their Role in Analysis
Dimensions:
What are dimensions? Dimensions are categorical fields used to slice, dice, and filter data (e.g., product category, date, region).
Relation to database columns: Each dimension is mapped to one or more columns in your database tables.
Hierarchical dimensions: These dimensions have a parent-child relationship, allowing for drill-down analysis (e.g., country -> state -> city).
Time dimensions: These dimensions represent time periods (e.g., year, month, day) and are often used for trend analysis.
Primary keys: In LookML, you specify primary keys using the primary_key: yes parameter in the view file.
Measures:
What are measures? Measures are numerical fields used for calculations and aggregations (e.g., total sales, average order value).
Definition using SQL expressions: Measures are defined in LookML using SQL expressions within the sql: parameter.
Types of aggregation functions: Common aggregations include sum, average, count, min, max, etc.
Filters:
How they work: Filters restrict the data returned by a query to specific criteria.
Filter types: Looker supports various filter types, including string, number, date, tier, and location filters.

What are the different LookML field types? (Dimensions, measures, parameters)
1. Strings (Text)
LookML Representation:
Dimension Type: string or type: string
SQL Type: Typically VARCHAR, TEXT, or CHAR (depending on your database)
Examples:
Product names (product.name)
Customer IDs (customer.id)
Descriptions (product.description)
Categories (product.category)
Looker Usage:
Filtering: WHERE product.name LIKE '%shirt%'
Sorting: ORDER BY product.name ASC (ascending) or DESC (descending)
Display: Text labels in charts and tables
Concatenation: CONCAT(customer.first_name, ' ', customer.last_name) AS full_name
2. Numbers (Integers and Decimals)
LookML Representation:
Dimension Type: number or type: number
Measure Type: sum, average, count, etc. (depending on the desired aggregation)
SQL Type: Typically INT, BIGINT, FLOAT, or DECIMAL (depending on your database)
Examples:
Sales quantities (order_items.quantity)
Prices (product.price)
Inventory levels (product.inventory)
Ratings (product.rating)
Looker Usage:
Calculations:
SUM(order_items.quantity * product.price) AS total_revenue
AVG(order_items.quantity)
Filtering: WHERE product.price BETWEEN 20 AND 50
Sorting: ORDER BY SUM(order_items.quantity) DESC
Visualizations: Bar graphs, line charts, scatter plots
3. Dates and Times
LookML Representation:
Dimension Type: date or type: date (for dates only), time or type: time (for times only), datetime or type: datetime (for combined date and time)
SQL Type: Typically DATE, TIME, or DATETIME (depending on your database)
Examples:
Order dates (orders.created_date)
Shipping dates (orders.shipped_date)
Event timestamps (events.timestamp)
Looker Usage:
Filtering: WHERE orders.created_date BETWEEN '2024-01-01' AND '2024-06-01'
Time-Based Calculations:
EXTRACT(YEAR FROM orders.created_date) (to get the year)
Trend Analysis: Line charts over time
Date Formatting: DATE_FORMAT(orders.created_date, '%Y-%m-%d') (to format as YYYY-MM-DD)
4. Booleans (True/False)
LookML Representation:
Dimension Type: yesno or type: yesno
SQL Type: Typically BOOLEAN, TINYINT, or a similar type (depending on your database)
Examples:
In-stock status (product.in_stock)
Subscription status (user.is_subscribed)
Email opt-in (user.email_opt_in)
Looker Usage:
Filtering: WHERE product.in_stock = true
Calculations: COUNT(DISTINCT CASE WHEN user.email_opt_in THEN user.id ELSE NULL END) AS num_opted_in
Visualizations: Pie charts, bar graphs showing the distribution of true/false values.



Common LookML parameters
common LookML parameters, their syntax, and how they enhance your data models and user experience within Looker:
1. The parameter Parameter
Purpose: Creates a filter-only field, allowing users to dynamically adjust values in an Explore, Look, or dashboard. These values can affect calculations, labels, URLs, and even the SQL query itself.
Syntax: Code snippet
parameter: my_parameter {
  type: [data_type]  # string, number, date, etc.
  allowed_values: [...]  # (Optional) List of allowed values
  default_value: "..."  # (Optional) Default value
  label: "My Parameter Label"  # User-friendly label
}


Example: A date parameter for filtering sales within a specified date range.
2. The label Parameter
Purpose: Provides a user-friendly name for a field that appears in Looker's interface (Explore, Look, etc.).
Syntax: Code snippet
dimension: order_id {
  type: string
  sql: \${TABLE}.order_id ;;
  label: "Order ID"
}


Example: Renaming a field called product_category_id in the database to the more intuitive "Product Category" in Looker.
3. The description Parameter
Purpose: Adds a helpful description to a field that explains its meaning or usage. This description appears in tooltips in Looker.
Syntax: Code snippet
dimension: order_id {
  type: string
  sql: \${TABLE}.order_id ;;
  description: "The unique identifier for a customer's order."
}


Example: Providing a description for a customer_lifetime_value measure, explaining how it's calculated.
4. The sql Parameter
Purpose: Defines the SQL expression used to retrieve the field's value from the underlying database.
Syntax: Code snippet
dimension: order_date {
  type: date
  sql: \${TABLE}.order_date ;;
}


Example: Extracting the order date from a timestamp field in your database using DATE(\${TABLE}.created_at)
5. The html Parameter
Purpose: Allows you to add custom HTML formatting to the display of a field's value.
Syntax:
Code snippet
dimension: order_status {
  type: string
  html: {% if value == 'Complete' %}
           <font color="green">{{ value }}</font>
        {% else %}
           <font color="red">{{ value }}</font>
        {% endif %} ;;
}


Example: Displaying "Complete" orders in green and other statuses in red.
6. The link Parameter
Purpose: Creates clickable links within your Looker data. These links can be internal (to other Looker content) or external (to web pages).
Syntax:
Code snippet
dimension: order_id {
  type: string
  sql: \${TABLE}.order_id ;;
  link: {
    label: "View Order Details"
    url: "https://your_order_management_system/orders/{{ value }}"
  }
}


Example: Adding a link to each order ID that takes users to the corresponding order details page in your order management system.
7. Liquid Templating
Many LookML parameters (e.g., label, html, link, sql) support Liquid, a templating language that allows you to dynamically inject values and logic into your LookML code.


Looker Explores
1. What is an Explore?
An Explore in Looker is a powerful, interactive interface for data analysis. Think of it as a dynamic window into your data warehouse, where you can:
Select Fields: Choose the dimensions and measures you want to analyze (e.g., product category, order date, sales revenue).
Apply Filters: Narrow down your results based on specific criteria (e.g., "only show orders from Q1 2024").
Pivot and Aggregate: Group and summarize data in different ways (e.g., total sales by month and product category).
Sort Results: Arrange your data in ascending or descending order based on chosen fields.
Visualize Data: Create charts, tables, and other visualizations to reveal patterns and trends.
Save & Share: Save your explorations as Looks (static reports) or dashboards (interactive collections of reports).
Essentially, an Explore empowers business users to explore data independently, without needing to write complex SQL queries.
2. How are Explores Created Using LookML Views and Joins?
Explores are built upon LookML views and joins, which define the structure and relationships of your data.
Example LookML View:
LookML
view: order_items {
  sql_table_name: public.order_items ;;
  dimension: order_id {
    primary_key: yes
    type: string
    sql: \${TABLE}.order_id ;;
  }

  dimension: product_id {
    type: string
    sql: \${TABLE}.product_id ;;
  }

  dimension: created_date {
    type: date
    sql: \${TABLE}.created_at ;;
  }

  measure: total_revenue {
    type: sum
    sql: \${TABLE}.price * \${TABLE}.quantity ;;
  }
}


Example LookML Explore:
LookML
explore: order_items_explore {
  view_name: order_items
  join: products {
    relationship: many_to_one
    sql_on: \${order_items.product_id} = \${products.product_id} ;;
  }

  # ... other dimensions, measures, and filters
}


In this example:
We define a view order_items based on a table called public.order_items.
We create an explore order_items_explore based on the order_items view.
We join the order_items view with another view called products to combine order and product information within the Explore.
3. Relationship Between Explores and Dashboards
An Explore serves as the foundation for creating Looker Looks (individual reports) and dashboards.
Looks: A Look is a saved configuration of an Explore, capturing the selected fields, filters, pivots, sorts, and visualizations.
Dashboards: A dashboard is a collection of Looks, providing a comprehensive overview of related metrics and insights.
Example Dashboard:
Imagine a sales dashboard with the following Looks:
Top Selling Products (Look 1): A bar chart based on the order_items_explore, showing the top 10 products by revenue.
Sales Trend Over Time (Look 2): A line chart from the same Explore, showing revenue over the past 6 months.
Revenue by Product Category (Look 3): A pie chart also from the order_items_explore, displaying revenue breakdown by product category.
Each of these Looks is created by configuring the order_items_explore with different fields, filters, and visualizations.

Looker Views
1. What is a LookML View?
In Looker, a view is a way to abstract and organize the underlying structure of your database tables. Think of it as a blueprint or a lens through which Looker understands your data.
Logical Representation: A view doesn't actually store data. Instead, it provides a logical representation of either:
A single database table: The view directly maps to the structure of a table in your database.
A combination of tables (joined together): The view represents the result of joining multiple tables based on their relationships.
Purpose: Views simplify the way you interact with your data. Instead of writing complex SQL queries directly, you can reference fields from views in your LookML code, making your models more readable and maintainable.
Code Example (Single Table View):
LookML
view: order_items {
  sql_table_name: public.order_items ;;

  dimension: id {
    type: number
    primary_key: yes
    sql: \${TABLE}.id ;;
  }

  dimension: order_id {
    type: number
    sql: \${TABLE}.order_id ;;
  }

  dimension: product_id {
    type: number
    sql: \${TABLE}.product_id ;;
  }

  measure: sale_price {
    type: sum
    sql: \${TABLE}.sale_price ;;
  }
}

In this example, the order_items view represents a table named order_items in the public schema of your database.
2. How are Views Used to Define Dimensions and Measures?
Views are the building blocks for defining the dimensions and measures that users will interact with in Looker explores and dashboards.
Dimensions: These are the categorical fields that you use to slice and dice your data (e.g., product category, order date, customer region). You define dimensions within a view by specifying their:
Name: A unique identifier for the dimension (e.g., product_category).
Type: The data type of the dimension (e.g., string, number, date).
SQL: The SQL expression used to retrieve the dimension's value from the underlying database table.
Measures: These are the numerical fields that you want to aggregate or calculate (e.g., total revenue, average order value, number of orders). You define measures within a view by specifying their:
Name: A unique identifier for the measure (e.g., total_revenue).
Type: The aggregation type (e.g., sum, average, count).
SQL: The SQL expression used to calculate the measure's value.
Code Example (Defining Dimensions and Measures):
LookML
view: order_items {
  # ... (view definition)

  dimension: product_category {
    type: string
    sql: \${TABLE}.product_category ;;
  }

  dimension: order_date {
    type: date
    sql: \${TABLE}.order_date ;;
  }

  measure: total_revenue {
    type: sum
    sql: \${TABLE}.sale_price ;;
  }
}

3. What are Derived Tables and How are They Used in LookML Views?
A derived table is a virtual table created by a SQL subquery. It acts as a temporary view within a LookML view.
Purpose: Derived tables provide flexibility to:
Perform complex calculations: Create measures that involve multiple tables or complex logic.
Pre-aggregate data: Improve performance by pre-aggregating data before it's queried by Looker.
Create reusable data subsets: Isolate specific parts of your data for easier analysis.
Code Example (Derived Table View):
LookML
view: top_customers {
  derived_table: {
    sql:
      SELECT
        customer_id,
        SUM(sale_price) AS total_spent
      FROM order_items
      GROUP BY 1
      ORDER BY 2 DESC
      LIMIT 100
    ;;
  }

  dimension: customer_id {
    type: number
    primary_key: yes
    sql: \${TABLE}.customer_id ;;
  }

  measure: total_spent {
    type: sum
    sql: \${TABLE}.total_spent ;;
  }
}

In this example, the top_customers view uses a derived table to pre-calculate the top 100 customers based on total spending.

LookML Joins
What are LookML Joins?
Joins are the backbone of multi-table analysis in Looker. They establish relationships between views, enabling you to seamlessly combine data from multiple tables or views into a single query. This is crucial when your information is spread across different sources, like orders in one table and customer details in another.
Types of Joins in LookML
Looker supports the four main types of SQL joins:
Left Outer Join (left_outer):
Includes all rows from the "left" view and only the matching rows from the "right" view.
Non-matching rows from the right view will have NULL values for their columns.
Useful when you want all records from one table and the corresponding data from another table, even if it's incomplete.
Full Outer Join (full_outer):
Includes all rows from both views.
Non-matching rows from either view will have NULL values for the columns from the other view.
Use this when you want to see all possible combinations of data, regardless of whether there's a match.
Inner Join (inner):
Includes only the rows where there's a match between both views.
This is the most common type of join and is used when you want data that exists in both tables.
Cross Join (cross):
Creates a Cartesian product, combining every row from the left view with every row from the right view.
Rarely used in Looker, but can be useful in niche scenarios.
Creating and Configuring Joins in LookML
You define joins within your LookML model file, specifically within the explore section. Here's the basic structure:
Code snippet
explore: order_items {
  #... (other explore configuration)
  joins: {
    orders: {
      relationship: many_to_one
      sql_on: \${order_items.order_id} = \${orders.id} ;;
    }
  }
}

Let's break down the key parameters:
relationship: Describes the cardinality of the relationship (one-to-one, many-to-one, one-to-many, many-to-many). This helps Looker optimize queries.
sql_on: Specifies the condition that determines how to match rows between the views. In our example, we join order_items to orders based on the matching order_id fields.
type: (Optional) The type of join. Defaults to left_outer.
from: (Optional) Specifies a different view to join from if you want to use an alias.
Example: Joining Orders and Products
Code snippet
explore: order_items {
  joins: {
    orders: {
      relationship: many_to_one
      sql_on: \${order_items.order_id} = \${orders.id} ;;
    },
    products: {
      relationship: many_to_one
      sql_on: \${order_items.product_id} = \${products.id} ;;
    }
  }
}
In this example, we've joined the order_items explore to both the orders and products views. This allows us to analyze orders alongside information about the customers who placed them and the products they ordered.
Key Points to Remember
Explore Joins: Joins are defined within an explore, making the fields from the joined views available for analysis within that specific Explore.
Relationship Matters: Choosing the correct relationship type helps Looker generate more efficient SQL.
SQL_ON Condition: The sql_on parameter is crucial for accurate joins. Make sure it correctly reflects how your tables are related.

Understanding the Explore URL Structure
An Explore URL in Looker typically follows this format:
https://[your_looker_instance]/explore/[model_name]/[explore_name]?fields=[dimensions],[measures]&f[filters]=[values]&sorts=[sorts]&limit=[limit]
[your_looker_instance]: Replace this with your Looker instance's URL (e.g., https://yourcompany.looker.com).
[model_name]: The name of the Looker model containing the data you want to explore.
[explore_name]: The name of the specific Explore within the model that you want to use.
fields=[dimensions],[measures]: A comma-separated list of the dimensions and measures you want to include in your results.
f[filters]=[values]: A filter expression to limit your results. The format is f[field_name]=value. You can have multiple filters by adding &f[another_field_name]=another_value.
sorts=[sorts]: A comma-separated list of fields to sort by, optionally followed by + (ascending) or - (descending).
limit=[limit]: The maximum number of rows to return.
Constructing the Explore URL for the User Request
Based on the user's request, the Explore URL would look like this:
https://[your_looker_instance]/explore/[model_name]/[orders_explore]?fields=orders.order_ID,orders.order_date,orders.revenue&f[products.category]=T-shirts&sorts=-orders.revenue&limit=10
Breakdown of Parameters:
fields=orders.order_ID,orders.order_date,orders.revenue: This selects the order_ID, order_date dimensions, and the revenue measure from the orders view.
f[products.category]=T-shirts: This filters the results to include only orders where the product category is "T-shirts".
sorts=-orders.revenue: This sorts the results in descending order based on the revenue measure, ensuring the top-selling items appear first.
limit=10: This limits the results to the top 10 items.
Additional Considerations
Explore Availability: Make sure the specified model and explore exist within your Looker instance.
Field References: Ensure the field names in the URL accurately match those in your Looker model.
Filter Logic: For more complex filters, you might need to use additional operators (e.g., >, <, BETWEEN) or combine multiple filters with AND or OR.
Date Filters: If filtering on dates, pay close attention to the date format expected by your Looker instance.
Example in Action
If your Looker instance is https://mycompany.looker.com, your model is called ecommerce, and the explore is order_items, the final URL would be:
https://mycompany.looker.com/explore/ecommerce/order_items?fields=orders.order_ID,orders.order_date,orders.revenue&f[products.category]=T-shirts&sorts=-orders.revenue&limit=10

Explore URL Deconstructed
https://[your_looker_instance]/explore/[model_name]/[orders_explore]?fields=orders.order_ID,orders.order_date,orders.revenue&f[products.category]=T-shirts&sorts=-orders.revenue&limit=10

`
const prompts = [
  looker_fundamentals_prompt,
  general_visualization_training_prompt,
  looker_explore_url_construction_zero_data_environment_prompt,
  ...visualization_prompts
]

export default prompts;
