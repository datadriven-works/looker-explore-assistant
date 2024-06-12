const Looker_Pie_Chart_explanation_prompt = `Looker Classic Bar Chart Visualizations using Highcharts
Objective: Create a system that allows users to generate Looker Classic visualizations (specifically bar charts) using natural language queries. The system should translate user requests into LookML queries and then produce the corresponding Highcharts JavaScript code to render the visualization.
What are Bar Charts Used for?
Bar charts are powerful tools for visualizing data, especially when comparing discrete categories or displaying data at specific points in time. Here's a breakdown of their common use cases:
Categorical Data Comparison:
Comparing values across groups: Bar charts excel at visually representing differences in values between distinct categories. For example, you could compare sales figures for different products, customer demographics, or marketing campaigns.
Highlighting proportions or distributions: Bar charts can display the percentage or frequency of each category within a dataset, helping users understand the relative size of different segments.
Identifying trends across categories: By comparing bars side-by-side, users can quickly identify patterns or trends in data that vary across categories.
Time Series Analysis:
Comparing performance over periods: Bar charts effectively display changes in values over specific periods, such as comparing monthly sales figures, quarterly revenue, or year-over-year growth.
Visualizing data at specific points in time: Bar charts clearly show the value of a metric for each specific point in time, allowing users to easily understand the data at a glance.
Other Use Cases:
Stacking and grouping: Bar charts can stack or group bars to show the contribution of different components to a total value, such as breaking down sales by region and product type.
Adding annotations: Bar charts can be annotated with text labels or markers to highlight specific values, outliers, or important events.
Important Considerations:
Categorical data: Bar charts are best suited for displaying categorical data, which is divided into distinct, non-continuous groups. They are less effective for visualizing continuous data, such as time series.
Limited number of categories: Too many categories can clutter the chart and make it difficult to interpret. Consider alternative visualizations, such as a stacked bar chart or a table, if you have a large number of categories.
Choosing the right scale: The scale of the axes can significantly influence the visual impact of the chart. Ensure the scale accurately reflects the range and magnitude of the data.
Clear labeling: Clearly label the axes and provide a legend for grouped or stacked bars. This enhances the chart's readability and helps the audience understand the data.
NLQ Example Questions for When to Use Bar Charts:
As a Looker and data visualization expert, understanding the context of a user's question is crucial in selecting the most appropriate visualization. While a bar chart is versatile for comparing categories or showing data at specific points, it's not always the best option.
The provided examples highlight common business scenarios where a bar chart excels due to its ability to visually compare discrete categories and display values at specific points in time. These questions often involve comparing performance across groups, understanding distribution, or evaluating data at specific periods. The distinct bars in a bar chart effectively illustrate differences, proportions, and relative magnitudes, making it easy for users to grasp the underlying story within the data.
However, it's essential to consider alternative visualizations when the context demands it. For instance, if the user is interested in showcasing trends over time, a line chart might be more suitable. If the focus is on understanding the relationship between multiple variables, a scatter plot could be a better choice. And if the goal is to explore the distribution of continuous data, a histogram might be more informative.
To determine the most appropriate visualization, carefully analyze the user's question, paying attention to the following aspects:
Type of data: Is it categorical (like product categories, regions, or customer segments) or continuous (like time, revenue, or temperature)?
Focus of the question: Is the user interested in comparisons between groups, distributions, data at specific points in time, or trends over time?
Level of detail: Does the user need a high-level overview or a more granular view of the data?
Communication goal: What message or insight is the user trying to convey with the visualization?
By considering these factors, you can confidently select the visualization that best aligns with the user's needs and effectively communicates the insights hidden within their data.
[ { "input": "Compare sales numbers for each product category.", "output": "A bar chart can visually represent the sales figures for different product categories, allowing for easy comparison." }, { "input": "What is the breakdown of customer demographics by age group?", "output": "A bar chart can display the distribution of customers across different age groups, providing insight into the customer base." }, { "input": "Show me the monthly revenue for the past year.", "output": "A bar chart can effectively display revenue figures for each month of the year, highlighting any fluctuations or trends." }, { "input": "Compare the performance of different marketing campaigns by click-through rate.", "output": "A bar chart can visually compare the click-through rates of various marketing campaigns, identifying the most effective ones." }, { "input": "What is the distribution of customer satisfaction ratings by region?", "output": "A bar chart can illustrate the proportion of customers in each region who have provided different satisfaction ratings." }, { "input": "Compare the number of orders placed by new and existing customers.", "output": "A bar chart can visually represent the number of orders from new and existing customers, providing insight into customer acquisition and retention." }, { "input": "Show me the quarterly profit margins for the past two years.", "output": "A bar chart can display profit margin figures for each quarter, allowing for easy comparison over time." }, { "input": "Compare the website traffic from different traffic sources.", "output": "A bar chart can effectively visualize the amount of traffic coming from different sources, such as organic search, social media, or paid advertising." }, { "input": "What is the distribution of employee tenure by department?", "output": "A bar chart can illustrate the proportion of employees in each department who have been with the company for different lengths of time." }, { "input": "Compare the number of customer support tickets resolved by different teams.", "output": "A bar chart can visually represent the number of tickets resolved by each support team, providing insight into team performance." } ]
Configuration Options:
Examining the configuration options available for the Bar Chart in Looker Classic is essential for understanding how to translate natural language into specific code. Here's a breakdown of those options, focusing on the Bar Chart:
Fields:
X-Axis: The field that determines the horizontal axis of the bar chart. This field must be a string or a date field.
Limits: You can't use multiple fields on the X-axis for a standard bar chart. However, you can use LookML calculated fields to combine data in a way that supports a single X-axis.
Y-Axis: The field that determines the vertical axis of the bar chart. This field can be numeric or a date field.
Limits: You can have multiple fields on the Y-axis, which will result in multiple bars for each category, each representing a different series.
Color: The field that determines the color of each bar on the chart. This can be a string or a numeric field.
Limits: The color field is typically a string or a numeric value. If numeric, Looker often uses color scales for visualization.
Filters:
Filters: You can filter the data that is displayed on the bar chart. These filters are applied to the data before it's sent to the chart, so the filtering logic is determined by LookML.
Limits: You can use any combination of LookML-defined filters that make sense for your dataset.
Visualization Options:
Limits: While you can change to other chart types, for this use case, you're specifically concerned with the Bar Chart.
Series: You can use the Y-Axis field to define multiple bars for each category, each representing a different series.
Limits: You can have as many series as your data allows, but too many bars on a single chart can be overwhelming. Consider using alternative visualizations or grouping bars for better clarity.
Stacking: You can stack the bars on the chart to show the cumulative effect of each series.
Limits: You can only stack bars if the data aligns properly (e.g., all bars share the same x-axis values).
Grouping: You can group the bars on the chart to show related series together.
Limits: Grouping is often used to visually differentiate and compare related data points within a category.
Data Transformations:
LookML: Looker's query language, LookML, allows you to perform transformations on your data before it's sent to the visualization. This includes:
Calculations: Creating new fields with calculated values.
Aggregation: Summing, averaging, or counting data based on certain dimensions.
Filtering: Applying filters based on specific conditions.
Renaming: Changing the names of fields or dimensions.
Example:
Let's say you want to visualize "Monthly Sales" by "Region" for the past year.
X-Axis: Region (a string field)
Y-Axis: Sales (a numeric field)
Color: Month (a date field, where Looker will use color scales to represent different months).
This would result in a bar chart with:
A separate bar for each region.
Sales values on the y-axis.
Colors assigned to each bar based on the Month field.
The Importance of Understanding Data Transformations:
LookML's ability to transform data before it reaches the chart is critical for this natural language interface. It means you can't just focus on the chart itself; you also need to be aware of how the data is prepared in LookML to understand how different user queries would affect the final visualization.
How to Leverage This Information for Your Natural Language Interface:
Map User Language to LookML: You need to build a system that can translate user questions like: "Show me the average sales by region for the past year" into the corresponding LookML query and visualization settings.
Identify Data Transformations: You'll need to understand how LookML affects the data, so you can determine which fields are available, which transformations are required, and how those transformations will affect the chart's appearance.
Explanation of Code Snippet for Highcharts:
The provided code snippet is a representation of a JSON object describing the visualization configuration for a Looker Classic bar chart, specifically using Highcharts as the underlying charting library. Think of it as a blueprint for how you want your bar chart to appear and function within Looker, but tailored to Highcharts.
Here's a breakdown of the essential elements:
type field: This specifies the visualization type as "looker_bar." This tells Looker that you're creating a bar chart.
series_colors: This field allows you to set custom colors for each bar series, enhancing visual clarity and differentiation.
axes: This defines multiple axes, including titles and labels for each axis. It allows you to customize the display of both X and Y axes.
series: This field maps each field to a specific axis, ensuring that the correct data is associated with each bar series.
title: This field provides a custom title for your visualization, making it easy to identify and understand the chart's purpose.
legend: This configures the legend's position within the visualization, improving the readability and understanding of different bar series.
Expanded Looker Bar Chart Example:
Here are expanded examples demonstrating various ways to customize your Looker bar chart, specifically using Highcharts, including:
Basic Bar Chart with Multiple Series:
\{
  "vis": {
    "type": "looker_bar",
    "series_colors": {
      "order_items.count": "#D13452",  // Red color
      "order_items.total_price": "#4CAF50" // Green color
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
    ],
    "title": "Sales Performance by Product Category - January-March 2023",
    "legend": {
      "position": "right" // Options: "top", "bottom", "left", "right"
    }
  },
  "query": {
    "view": "your_view_name",
    "fields": [
      "product.category",
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
      "product.category asc"
    ]
  }
}
\Stacked Bar Chart:
\{
  "vis": {
    "type": "looker_bar",
    "stacking": "normal", // Options: "normal", "percent"
    "series_colors": {
      "order_items.count": "#D13452",
      "order_items.total_price": "#4CAF50"
    },
    "title": "Sales Performance by Product Category - January-March 2023",
    "legend": {
      "position": "right" // Options: "top", "bottom", "left", "right"
    }
  },
  "query": {
    "view": "your_view_name",
    "fields": [
      "product.category",
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
      "product.category asc"
    ]
  }
}
\Note: These are just a few examples; there are many other visualization settings available in Looker to customize your bar charts. Refer to the official Looker documentation and Highcharts documentation for a complete list of options.


`
export default Looker_Pie_Chart_explanation_prompt