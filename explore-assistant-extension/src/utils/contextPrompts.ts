const looker_line_chart_explanation_prompt = `
Looker Line Chart Visualizations using Highcharts
Objective: Create a system that allows users to generate Looker Classic visualizations (specifically line charts) using natural language queries. The system should translate user requests into LookML queries and then produce the corresponding Highcharts JavaScript code to render the visualization.
What are Line Charts used for?


Line charts are versatile tools for visualizing data, particularly when showcasing trends, changes, or relationships over a continuous variable (often time). Here's a breakdown of their various use cases:

Time Series Analysis:

Tracking trends over time: This is the most common use case. Line charts are excellent at visualizing how a single variable (e.g., stock prices, website traffic, temperature) changes over days, weeks, months, or even years. The continuous line helps to identify patterns, seasonality, or outliers.
Forecasting: By analyzing the historical trend, line charts can aid in predicting future values. This is crucial in fields like finance, economics, and weather forecasting.
Comparing multiple time series: Line charts can overlay multiple lines, each representing a different variable or group, making it easy to compare their performance over time. This is helpful for tracking market share, product sales, or demographic changes.
Highlighting fluctuations and anomalies: The visual nature of the line chart allows for quick identification of sudden spikes, dips, or unusual patterns that might require further investigation.
Period-over-Period (PoP) Analysis:

Measuring growth or decline: Line charts are ideal for comparing performance between different periods (e.g., month-over-month, year-over-year). The slope of the line indicates the rate of change, making it easy to see whether the trend is positive or negative.
Identifying seasonality: By overlaying lines for different periods, line charts can reveal repeating patterns of highs and lows that occur at specific times of the year. This is useful for businesses planning inventory, marketing campaigns, or staffing levels.
Benchmarking against targets: Line charts can include a reference line representing a target or goal. Comparing the actual trend against this benchmark shows how well the performance is meeting expectations.
Other Use Cases:

Frequency distribution (histogram-like): While not as common, line charts can be used to display the frequency distribution of a continuous variable, similar to a histogram. The x-axis represents the variable's value, and the y-axis shows the frequency or density.
Correlation analysis: Line charts can help visualize the relationship between two continuous variables. If the lines for both variables follow a similar pattern, it suggests a positive correlation. If they move in opposite directions, it indicates a negative correlation.
Sparklines: These are small, minimalist line charts often embedded within tables or text to provide a quick overview of a trend. They are useful when space is limited but visual representation is desired.
Important Considerations:

Suitable for continuous data: Line charts are best used for data that is continuous or has a natural order (like time). They are not ideal for categorical data or data with large gaps.
Limited number of lines: Too many lines on a single chart can become cluttered and difficult to interpret. Consider using multiple charts or alternative visualizations if you have a large number of variables or groups.
Choose the right scale: The scale of the axes can significantly impact the visual interpretation of the data. Make sure to choose scales that accurately represent the range and magnitude of the changes.
Labeling and annotations: Clearly label the axes, provide a legend for multiple lines, and add annotations to highlight important points or events. This will help the audience understand the chart.




NLQ example questions for when to use Line Charts


As a Looker and data visualization expert, understanding the context of a user's question is crucial in selecting the most appropriate visualization. While a line chart is versatile for showcasing trends over time, it's not always the best option.



The provided examples highlight common business scenarios where a line chart excels due to its ability to visually depict changes and patterns in data over a continuous variable, usually time. These questions often involve tracking performance metrics, identifying trends, comparing periods, or assessing the impact of specific actions or events. The continuous line in a line chart effectively illustrates fluctuations, growth rates, and overall trajectories, making it easy for users to grasp the underlying story within the data.

However, it's essential to consider alternative visualizations when the context demands it. For instance, if the user is interested in comparing discrete categories, a bar chart might be more suitable. If the focus is on understanding the distribution of data, a histogram could be a better choice. And if the goal is to explore relationships between multiple variables, a scatter plot might be more informative.

To determine the most appropriate visualization, carefully analyze the user's question, paying attention to the following aspects:

Type of data: Is it continuous (like time, revenue, or temperature) or categorical (like product categories, regions, or customer segments)?
Focus of the question: Is the user interested in trends over time, comparisons between groups, distributions, or relationships?
Level of detail: Does the user need a high-level overview or a more granular view of the data?
Communication goal: What message or insight is the user trying to convey with the visualization?
By considering these factors, you can confidently select the visualization that best aligns with the user's needs and effectively communicates the insights hidden within their data.

[
  {
    "input": "How have our sales numbers changed over the past year?",
    "output": "A line chart can effectively show the trend and fluctuations of sales figures throughout the year, making it easy to identify peak periods and potential dips."
  },
  {
    "input": "What is the trend of our website traffic over the last quarter?",
    "output": "A line chart visually represents the daily or weekly changes in website traffic, helping to identify any significant increases or decreases."
  },
  {
    "input": "How has our customer acquisition cost evolved over the past six months?",
    "output": "A line chart can track the fluctuations in customer acquisition cost, revealing if there are any trends or seasonal patterns."
  },
  {
    "input": "What is the monthly growth rate of our email subscribers?",
    "output": "A line chart with the slope of the line clearly depicts the growth rate, indicating whether the subscription base is expanding or contracting."
  },
  {
    "input": "How does our product's average rating change over time?",
    "output": "A line chart can illustrate how customer perception and satisfaction evolve, helping to pinpoint any significant shifts in sentiment."
  },
  {
    "input": "What is the trend of our social media engagement over the past year?",
    "output": "A line chart can showcase the overall trend of engagement, helping to determine if social media efforts are yielding results."
  },
  {
    "input": "How have our production costs changed month-over-month?",
    "output": "A line chart can visually depict the monthly fluctuations in production costs, highlighting any spikes or consistent increases."
  },
  {
    "input": "What is the average order value trend over the last quarter?",
    "output": "A line chart can show if the average order value is increasing or decreasing, which is crucial for understanding revenue trends."
  },
  {
    "input": "How does our employee turnover rate compare year-over-year?",
    "output": "A line chart can illustrate if employee turnover is improving or worsening compared to the previous year."
  },
  {
    "input": "What is the trend of our marketing campaign ROI over the past six months?",
    "output": "A line chart can track the effectiveness of marketing campaigns by showing the ROI trend, helping to determine which campaigns are most successful."
  },
  {
    "input": "How have our stock prices fluctuated over the past five years?",
    "output": "A line chart is ideal for illustrating the volatility and overall trend of stock prices over an extended period."
  },
  {
    "input": "What is the trend of our customer satisfaction scores over the past year?",
    "output": "A line chart can show whether customer satisfaction is improving, declining, or remaining stable."
  },
  {
    "input": "How does our return on investment (ROI) vary by product category?",
    "output": "Multiple lines on a chart can compare the ROI trends of different product categories, helping to identify top performers and laggards."
  },
  {
    "input": "What is the trend of our customer churn rate over the last quarter?",
    "output": "A line chart can help identify if the customer churn rate is increasing or decreasing, revealing potential issues with customer retention."
  },
  {
    "input": "How have our website page load times changed over the past month?",
    "output": "A line chart can visualize fluctuations in page load times, which can be indicative of technical issues or optimization needs."
  },
  {
    "input": "What is the trend of our employee engagement scores over the past two years?",
    "output": "A line chart can show if employee engagement is improving or declining, helping to assess the effectiveness of HR initiatives."
  },
  {
    "input": "How does our market share compare to our competitors over time?",
    "output": "Multiple lines on a chart can compare the market share trends of different companies, showcasing the competitive landscape."
  },
  {
    "input": "What is the trend of our revenue per employee over the last three years?",
    "output": "A line chart can indicate if revenue per employee is growing, highlighting the productivity and efficiency of the workforce."
  },
  {
    "input": "How has our profit margin changed quarter-over-quarter?",
    "output": "A line chart can reveal the trend of profit margin, helping to identify areas for cost reduction or revenue improvement."
  },
  {
    "input": "What is the trend of our customer lifetime value over the past year?",
    "output": "A line chart can illustrate whether customer lifetime value is increasing or decreasing, which is important for assessing long-term profitability."
  },
  {
    "input": "How does our net promoter score (NPS) compare to industry benchmarks?",
    "output": "Multiple lines can compare our NPS trend to industry averages, showing how well we're performing relative to competitors."
  },
  {
    "input": "What is the trend of our inventory turnover ratio over the last six months?",
    "output": "A line chart can help identify if inventory management is improving or worsening, indicating potential issues with overstocking or understocking."
  },
  {
    "input": "How has our debt-to-equity ratio changed over the past five years?",
    "output": "A line chart can show if the company's financial leverage is increasing or decreasing, which is crucial for assessing financial risk."
  },
  {
    "input": "What is the trend of our operating expenses as a percentage of revenue?",
    "output": "A line chart can help monitor if operating expenses are growing faster or slower than revenue, impacting profitability."
  },
  {
    "input": "How does our website conversion rate vary by traffic source?",
    "output": "Multiple lines on a chart can compare the conversion rates of different traffic sources, highlighting the most effective channels."
  },
  {
    "input": "What is the trend of our customer support ticket resolution time over the last month?",
    "output": "A line chart can illustrate if customer support is becoming more or less efficient in resolving issues."
  },
  {
    "input": "How does our employee satisfaction rate change by department?",
    "output": "Multiple lines can compare the employee satisfaction trends of different departments, revealing potential issues with specific teams."
  },
  {
    "input": "What is the trend of our email open rate over the past year?",
    "output": "A line chart can show if email marketing efforts are improving in terms of engagement and reach."
  }
]

Configuration Options

examining the configuration options available for the Line Chart in Looker Classic is essential for understanding how to translate natural language into specific code. Here's a breakdown of those options, focusing on the Line Chart:


1. Fields:
X-Axis: The field that determines the horizontal axis of the line chart. This field must be a numeric or date field.
Limits: You can't use multiple fields on the X-axis for a standard line chart. However, you can use LookML calculated fields to combine data in a way that supports a single X-axis.
Y-Axis: The field that determines the vertical axis of the line chart. This field can be numeric, date, or string.
Limits: You can have multiple fields on the Y-axis, which will result in multiple lines on the chart, each representing a different series.
Color: The field that determines the color of each line on the chart. This can be a string or numeric field.
Limits: The color field is typically a string or numeric value. If numeric, Looker often uses color scales for visualization.


2. Filters:
Filters: You can filter the data that is displayed on the line chart. These filters are applied to the data before it's sent to the chart, so the filtering logic is determined by LookML.
Limits: You can use any combination of LookML-defined filters that make sense for your dataset.
3. Visualization Options:
Limits: While you can change to other chart types, for this use case, you're specifically concerned with the Line Chart.


Series: You can use the Y-Axis field to define multiple lines on the chart, each representing a different series.


Limits: You can have as many series as your data allows, but too many lines on a single chart can be overwhelming.


Stacking: You can stack the lines on the chart to show the cumulative effect of each series.


Limits: You can only stack lines if the data aligns properly (e.g., all lines share the same x-axis values).


Visualization Specific Settings:
These are unique to the line chart:
Line Style: Solid, dashed, dotted, etc.
Marker Type: Circle, square, triangle, etc.
Labeling: You can add labels to the lines, axes, or data points.
Tooltips: You can configure what information is displayed when you hover over a data point.


4. Data Transformations:
LookML: Looker's query language, LookML, allows you to perform transformations on your data before it's sent to the visualization. This includes:
Calculations: Creating new fields with calculated values.
Aggregation: Summing, averaging, or counting data based on certain dimensions.
Filtering: Applying filters based on specific conditions.
Renaming: Changing the names of fields or dimensions.
Example
Let's say you want to visualize "Monthly Sales" by "Region" for the past year.
X-Axis: Month (a date field)
Y-Axis: Sales (a numeric field)
Color: Region (a string field)
This would result in a line chart with:
A separate line for each region.
The month on the x-axis.
Sales values on the y-axis.
Colors assigned to each region based on the Region field.


The Importance of Understanding Data Transformations
LookML's ability to transform data before it reaches the chart is critical for this natural language interface. It means you can't just focus on the chart itself; you also need to be aware of how the data is prepared in LookML to understand how different user queries would affect the final visualization.
How to Leverage This Information for Your Natural Language Interface
Map User Language to LookML: You need to build a system that can translate user questions like: "Show me how sales have been trending by region this year" into the corresponding LookML query and visualization settings.
Identify Data Transformations: You'll need to understand how LookML affects the data, so you can determine which fields are available, which transformations are required, and how those transformations will affect the chart's appearance.



Explanation of Code Snippet for Vertex AI:

This JSON we're looking at here is like a blueprint for how we want our Looker visualization to look and act. The important part is the type field set to "looker_line".

This tells Vertex AI that we're working with a specific kind of chart – a Looker line chart.

Think of it like this: Vertex AI is trying to understand your request, and giving it this blueprint helps it figure out what you're aiming for. It knows it's dealing with a line chart and not, say, a bar chart or a pie chart.

Here's why this is important:

Data Understanding: Vertex AI needs to know the type of chart to correctly process the data. A line chart deals with trends and changes over time, while a bar chart compares different categories. Knowing this is critical.

Helpful Suggestions: Vertex AI can now offer smart suggestions tailored to line charts. It might say, "Hey, you want to show this data over time? Let's use a time scale on the X-axis." Or, "Try these color palettes for your lines." It also knows what LookML functions are good for line chart data.

Code Generation: If you ask Vertex AI to generate code for this chart, it can use this JSON to create the right Highcharts options. It knows to use Highcharts.chart and to set the right properties for a line chart.

For example:


\`\`\`json
{
  "vis": {
    "x_axis_gridlines": false,  // Whether to show gridlines on the x-axis (false = no gridlines)
      "y_axis_gridlines": true,   // Whether to show gridlines on the y-axis (true = show gridlines)
        "show_view_names": false,  // Whether to display the names of the LookML views (false = don't show)
          "show_y_axis_labels": true,  // Whether to show labels on the y-axis (true = show labels)
            "show_y_axis_ticks": true,   // Whether to show ticks on the y-axis (true = show ticks)
              "y_axis_tick_density": "default",  // How dense the ticks are on the y-axis (default = Looker determines)
                "y_axis_tick_density_custom": 5,  // Custom tick density value (only relevant if 'y_axis_tick_density' is 'custom')
                  "show_x_axis_label": true,  // Whether to show the label for the x-axis (true = show label)
                    "show_x_axis_ticks": true,   // Whether to show ticks on the x-axis (true = show ticks)
                      "y_axis_scale_mode": "linear", //  Scale mode for the y-axis (linear = evenly spaced ticks)
                        "x_axis_reversed": false,  // Whether to reverse the x-axis (false = not reversed)
                          "y_axis_reversed": false,  // Whether to reverse the y-axis (false = not reversed)
                            "plot_size_by_field": false, //  Whether to adjust plot size based on fields (false = not adjusted)
                              "trellis": "",              //  Type of trellis (grid) layout ("" = no trellis)
                                "stacking": "",            //  Type of stacking for series ("" = no stacking)
                                  "limit_displayed_rows": false, //  Whether to limit the number of rows displayed (false = no limit)
                                    "legend_position": "center",  //  Position of the legend (center = horizontally centered)
                                      "point_style": "none",        // Style of points on the line (none = just the line)
                                        "show_value_labels": false,  // Whether to show labels for the data values (false = don't show)
                                          "label_density": 25,         //  Density of labels on the chart (how often they are shown)
                                            "x_axis_scale": "auto",      //  Scale for the x-axis (auto = automatically determined)
                                              "y_axis_combined": true,    // Whether the y-axis is combined for multiple series (true = combined)
                                                "show_null_points": true,    // Whether to show points with null values (true = show points)
                                                  "interpolation": "linear",   //  Type of interpolation between data points (linear = straight lines)
                                                    "x_axis_zoom": true,        // Whether the x-axis can be zoomed (true = zoomable)
                                                      "y_axis_zoom": true,        // Whether the y-axis can be zoomed (true = zoomable)
                                                        "limit_displayed_rows_values": {
      "show_hide": "hide",    // Whether to hide rows (hide = hide rows by default)
        "first_last": "first",  // Which rows to hide (first = hide based on first and last rows)
          "num_rows": 0           //  Number of rows to hide (0 = no specific number)
    },
    "hide_legend": false,      // Whether to hide the legend (false = show legend)
      "type": "looker_line",       // Type of visualization - this specifies a Looker line chart
        "defaults_version": 1      // Version of the Looker visualization defaults
  },
  "filter_config": { },       //  Object for filter configuration (empty = no filters applied)
  "origin": "share-expanded" //  How the visualization was shared
}
\`\`\`

And here’s an example of the Looker encoded URL for the line chart visualization and configurations:

vis=%7B%22x_axis_gridlines%22%3Afalse%2C%22y_axis_gridlines%22%3Atrue%2C%22show_view_names%22%3Afalse%2C%22show_y_axis_labels%22%3Atrue%2C%22show_y_axis_ticks%22%3Atrue%2C%22y_axis_tick_density%22%3A%22default%22%2C%22y_axis_tick_density_custom%22%3A5%2C%22show_x_axis_label%22%3Atrue%2C%22show_x_axis_ticks%22%3Atrue%2C%22y_axis_scale_mode%22%3A%22linear%22%2C%22x_axis_reversed%22%3Afalse%2C%22y_axis_reversed%22%3Afalse%2C%22plot_size_by_field%22%3Afalse%2C%22trellis%22%3A%22%22%2C%22stacking%22%3A%22%22%2C%22limit_displayed_rows%22%3Afalse%2C%22legend_position%22%3A%22center%22%2C%22point_style%22%3A%22none%22%2C%22show_value_labels%22%3Afalse%2C%22label_density%22%3A25%2C%22x_axis_scale%22%3A%22auto%22%2C%22y_axis_combined%22%3Atrue%2C%22show_null_points%22%3Atrue%2C%22interpolation%22%3A%22linear%22%2C%22x_axis_zoom%22%3Atrue%2C%22y_axis_zoom%22%3Atrue%2C%22limit_displayed_rows_values%22%3A%7B%22show_hide%22%3A%22hide%22%2C%22first_last%22%3A%22first%22%2C%22num_rows%22%3A0%7D%2C%22hide_legend%22%3Afalse%2C%22type%22%3A%22looker_line%22%2C%22defaults_version%22%3A1%7D&filter_config=%7B%7D&origin=share-expanded

Explanation of Key Elements:
type: Specifies the visualization type. Here, we use "looker_line".
series_colors: Sets custom colors for individual series.
axes: Defines multiple Y-axes, including titles and labels for each axis.
series: Maps each field to a specific Y-axis.
title: Provides a custom title for the visualization.
legend: Configures the legend's position within the visualization.
Note: These are just a few examples; there are many other visualization settings available in Looker to customize your line charts. Refer to the official Looker documentation for a complete list of options.





Expanded Looker Line Chart Example:
Here's an expanded example demonstrating various ways to customize your Looker line chart, including:
1. Basic Line Chart with Multiple Series:
{
  "query": {
    "view": "your_view_name",
    "fields": [
      "date",
      "order_items.count",
      "order_items.total_price"
    ],
    "filters": {
      "date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "sorts": [
      "date asc"
    ],
    "visualization": {
      "type": "looker_line"
    }
  }
}



2. Line Chart with Custom Colors:
{
  "query": {
    "view": "your_view_name",
    "fields": [
      "date",
      "order_items.count",
      "order_items.total_price"
    ],
    "filters": {
      "date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "sorts": [
      "date asc"
    ],
    "visualization": {
      "type": "looker_line",
      "series_colors": {
        "order_items.count": "#D13452",  // Red color
        "order_items.total_price": "#4CAF50" // Green color
      }
    }
  }
}



3. Line Chart with Multiple Axes and Custom Labels:
{
  "query": {
    "view": "your_view_name",
    "fields": [
      "date",
      "order_items.count",
      "order_items.total_price"
    ],
    "filters": {
      "date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "sorts": [
      "date asc"
    ],
    "visualization": {
      "type": "looker_line",
      "series_colors": {
        "order_items.count": "#D13452",
        "order_items.total_price": "#4CAF50"
      },
      "axes": {
        "y_axis_0": {
          "title": "Number of Orders",
          "label": "Orders"
        },
        "y_axis_1": {
          "title": "Total Revenue",
          "label": "Revenue"
        }
      },
      "series": [
        {
          "field": "order_items.count",
          "axis": "y_axis_0"
        },
        {
          "field": "order_items.total_price",
          "axis": "y_axis_1"
        }
      ]
    }
  }
}



4. Line Chart with Custom Title and Legend:
{
  "query": {
    "view": "your_view_name",
    "fields": [
      "date",
      "order_items.count",
      "order_items.total_price"
    ],
    "filters": {
      "date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "sorts": [
      "date asc"
    ],
    "visualization": {
      "type": "looker_line",
      "series_colors": {
        "order_items.count": "#D13452",
        "order_items.total_price": "#4CAF50"
      },
      "title": "Sales Performance January-March 2023",
      "legend": {
        "position": "right"  // Options: "top", "bottom", "left", "right"
      }
    }
  }
}

`
const looker_explore_url_construction_zero_data_environment_prompt = `
Looker Explore URL Construction Guide for Zero-Data Environments (ecommerce)
Setup prompt

You are an expert in Looker data modeling and exploration.
Your goal is to understand user questions and translate them into Looker Explore URLs, even when no real data is available.
Remember these key points about Looker:
* LookML is the modeling language used to define dimensions, measures, and relationships in Looker.
* Explores are customizable interfaces for querying and analyzing data, defined using LookML views and joins.
* Dimensions are fields used to categorize and group data (e.g., product category, customer location).
* Measures are fields used for calculations and aggregations (e.g., total sales, average order value).
* Filters restrict results to specific criteria (e.g., "orders placed in the last month").
*Pivots: Create matrix-like views with multiple dimensions and measures (e.g., sales by product category and month).
* Sorts order results based on a specified field.

Explore URLs follow this general format: https://[your_looker_instance]/explore/[model_name]/[explore_name]?fields=[dimensions],[measures]&f[filters]=[values]&sorts=[sorts]&limit=[limit]&pivots=[pivots]


Sample ecommerce Qs and URLs in JSON format
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
  },
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
  looker_line_chart_explanation_prompt,
]

export default prompts;
