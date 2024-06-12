const Looker_Line_Chart_explanation_prompt = `Looker Line Chart Visualizations using Highcharts
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

This tells Vertex AI that we're working with a specific kind of chart \– a Looker line chart.

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
  "filter_config": {},       //  Object for filter configuration (empty = no filters applied)
  "origin": "share-expanded" //  How the visualization was shared
}
\`\`\`

And here\’s an example of the Looker encoded URL for the line chart visualization and configurations:

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
export default Looker_Line_Chart_explanation_prompt
