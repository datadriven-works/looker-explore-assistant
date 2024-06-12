const Looker_Column_Chart_Explanation_Prompt = `Looker Classic Column Chart Visualizations Using Natural Language Queries
Objective: Create a system that allows users to generate Looker Classic visualizations (specifically column charts) using natural language queries. The system should translate user requests into LookML queries and then produce the corresponding Looker Classic visualization settings.
What are Column Charts Used For?
Column charts are excellent for comparing discrete categories and showcasing data at a glance. They are ideal for visualizing data where the focus is on comparing values across different groups or categories, rather than showcasing trends over time. Here's a breakdown of their various use cases:
Categorical Data Comparison:
Comparing performance across groups: This is the most common use case. Column charts are excellent at visualizing how a single variable (e.g., sales, customer satisfaction, website traffic) differs between different categories (e.g., product lines, regions, customer segments). The height of each column represents the value for that category, making comparisons easy.
Identifying outliers or top performers: The visual nature of the column chart allows for quick identification of categories that have significantly higher or lower values compared to the rest. This is helpful for pinpointing areas of strength or weakness.
Showing relative proportions: Column charts can display the proportion of each category relative to the whole. For example, you can visualize the market share of different brands or the distribution of sales across different product lines.
Breaking down complex data: You can use stacked column charts to visualize multiple variables within each category. This is helpful for understanding how different factors contribute to the overall value.
Other Use Cases:
Distribution analysis: While not as common, column charts can be used to visualize the distribution of a categorical variable, similar to a histogram. The x-axis represents the categories, and the y-axis shows the frequency or count for each category.
Spatial analysis: Column charts can be used to visualize data across different locations. For example, you can visualize the number of customers in different regions or the sales performance in different stores.
Important Considerations:
Suitable for categorical data: Column charts are best used for data that is categorical or discrete, where each data point represents a distinct category. They are not ideal for continuous data, like time series.
Limited number of categories: Too many categories on a single chart can become cluttered and difficult to interpret. Consider using multiple charts or alternative visualizations if you have a large number of categories.
Choose the right scale: The scale of the axes can significantly impact the visual interpretation of the data. Make sure to choose scales that accurately represent the range and magnitude of the changes.
Labeling and annotations: Clearly label the axes and provide a legend for multiple series to help the audience understand the chart.
NLQ Example Questions for When to Use Column Charts:
As a Looker and data visualization expert, understanding the context of a user's question is crucial in selecting the most appropriate visualization. While a column chart is effective for comparing categorical data, it's not always the best option.
The examples below showcase scenarios where a column chart is a good choice:
     [
  {
    "input": "What are the sales figures for each product line last month?",
    "output": "A column chart can effectively compare the sales performance of different product lines, highlighting the top sellers and potential underperformers."
  },
  {
    "input": "How does customer satisfaction vary by region?",
    "output": "A column chart can visualize customer satisfaction scores for different regions, revealing any disparities or areas that need improvement."
  },
  {
    "input": "What is the distribution of leads by marketing channel?",
    "output": "A column chart can showcase the number of leads generated through different marketing channels, helping to determine the most effective channels."
  },
  {
    "input": "What is the average order value for each customer segment?",
    "output": "A column chart can compare the average order value across different customer segments, indicating which segments are driving the most revenue."
  },
  {
    "input": "How many sales were made by each salesperson last quarter?",
    "output": "A column chart can visually compare the sales performance of individual salespeople, identifying top performers and those who need additional training or support."
  },
  {
    "input": "What is the breakdown of website traffic by source?",
    "output": "A column chart can show the proportion of website traffic coming from different sources, like organic search, social media, and paid advertising."
  },
  {
    "input": "How does our product's average rating vary across different age groups?",
    "output": "A column chart can compare the average ratings of a product across different age demographics, revealing potential differences in customer perception."
  },
  {
    "input": "What is the distribution of employee tenure by department?",
    "output": "A column chart can visualize the number of employees with different tenure lengths in each department, helping to understand workforce stability and experience levels."
  },
  {
    "input": "How many tickets were resolved by each support agent last week?",
    "output": "A column chart can effectively compare the performance of different support agents, highlighting those who are most efficient in resolving customer issues."
  },
  {
    "input": "What is the breakdown of our customer base by location?",
    "output": "A column chart can visualize the number of customers in different geographic regions, providing insights into market penetration and customer distribution."
  }
]
   

Configuration Options in Looker Classic:
Understanding the configuration options available for the Column Chart in Looker Classic is essential for translating natural language into specific code. Here's a breakdown of those options, focusing on the Column Chart:
Fields:
X-Axis: The field that determines the horizontal axis of the column chart. This field must be a categorical or string field.
Y-Axis: The field that determines the vertical axis of the column chart. This field must be a numeric field.
Color: The field that determines the color of each column on the chart. This can be a string or numeric field.
Filters:
Filters: You can filter the data that is displayed on the column chart. These filters are applied to the data before it's sent to the chart, so the filtering logic is determined by LookML.
Visualization Options:
Series: You can use the X-Axis field to define multiple columns on the chart, each representing a different series.
Stacking: You can stack the columns on the chart to show the cumulative effect of each series.
Grouping: You can group columns together to show a more aggregated view of the data.
Visualization Specific Settings:
Column Style: You can change the style of the columns, including their width, border, and color.
Labeling: You can add labels to the columns, axes, or data points.
Tooltips: You can configure what information is displayed when you hover over a column.
Data Transformations:
LookML: Looker's query language, LookML, allows you to perform transformations on your data before it's sent to the visualization. This includes:
Calculations: Creating new fields with calculated values.
Aggregation: Summing, averaging, or counting data based on certain dimensions.
Filtering: Applying filters based on specific conditions.
Renaming: Changing the names of fields or dimensions.

Example
Let's say you want to visualize "Total Sales" by "Product Category" for the past quarter.
X-Axis: Product Category (a string field)
Y-Axis: Total Sales (a numeric field)
Color: (Optional) You could use a field like "Product Line" to color-code the columns for each category.
This would result in a column chart with:
A separate column for each product category.
The total sales for each category on the y-axis.
(Optional) Columns for each category color-coded according to the "Product Line" field.
The Importance of Understanding Data Transformations
LookML's ability to transform data before it reaches the chart is critical for this natural language interface. It means you can't just focus on the chart itself; you also need to be aware of how the data is prepared in LookML to understand how different user queries would affect the final visualization.
How to Leverage This Information for Your Natural Language Interface:
Map User Language to LookML: You need to build a system that can translate user questions like: "Show me the sales breakdown by product category this quarter" into the corresponding LookML query and visualization settings.
Identify Data Transformations: You'll need to understand how LookML affects the data, so you can determine which fields are available, which transformations are required, and how those transformations will affect the chart's appearance.
Explanation of Code Snippet for Vertex AI:
This JSON snippet serves as a blueprint for Vertex AI to understand your request and generate the appropriate Looker Classic column chart visualization:
     {
  "vis": {
    "x_axis_gridlines": false,  // Whether to show gridlines on the x-axis (false = no gridlines)
    "y_axis_gridlines": true,   // Whether to show gridlines on the y-axis (true = show gridlines)
    "show_view_names": false,  // Whether to display the names of the LookML views (false = don't show)
    "show_y_axis_labels": true,  // Whether to show labels on the y-axis (true = show labels)
    "show_y_axis_ticks": true,   // Whether to show ticks on the y-axis (true = show ticks)
    "y_axis_tick_density": "default",  // How dense the ticks are on the y-axis (default = Looker determines)
    "y_axis_tick_density_custom": 5, // Custom tick density value (only relevant if 'y_axis_tick_density' is 'custom')
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
    "type": "looker_column",       // Type of visualization - this specifies a Looker column chart
    "defaults_version": 1      // Version of the Looker visualization defaults
  },
  "filter_config": {},       //  Object for filter configuration (empty = no filters applied)
  "origin": "share-expanded" //  How the visualization was shared 
}
   

This JSON snippet specifically sets the "type" field to "looker_column", indicating that Vertex AI should generate a Looker Classic column chart.
Expanded Looker Column Chart Example:
Here's an expanded example demonstrating various ways to customize your Looker Classic column chart, including:
Basic Column Chart with Multiple Series:
     {
  "query": {
    "view": "your_view_name",
    "fields": [
      "product_category",
      "total_sales"
    ],
    "filters": {
      "date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "visualization": {
      "type": "looker_column"
    }
  }
}
   

Column Chart with Custom Colors:
     {
  "query": {
    "view": "your_view_name",
    "fields": [
      "product_category",
      "total_sales"
    ],
    "filters": {
      "date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "visualization": {
      "type": "looker_column",
      "series_colors": {
        "product_category": {
          "Electronics": "#D13452", 
          "Clothing": "#4CAF50",
          "Furniture": "#FFC107"
        }
      }
    }
  }
}
   
content_copyUse code with caution.Json
Stacked Column Chart:
     {
  "query": {
    "view": "your_view_name",
    "fields": [
      "product_category",
      "online_sales",
      "in_store_sales"
    ],
    "filters": {
      "date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "visualization": {
      "type": "looker_column",
      "stacking": "normal" 
    }
  }
}
   

Column Chart with Custom Title and Legend:
     {
  "query": {
    "view": "your_view_name",
    "fields": [
      "product_category",
      "total_sales"
    ],
    "filters": {
      "date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "visualization": {
      "type": "looker_column",
      "title": "Sales Performance by Product Category (Q1 2023)",
      "legend": {
        "position": "right"
      }
    }
  }
}
   

Remember that the specific configuration options available in Looker Classic might vary depending on your Looker version and the data you are using.
This rewritten document now focuses on Looker Classic column charts, providing guidance on its use cases, configuration options, and how to integrate it with a natural language interface.


`
export default Looker_Column_Chart_Explanation_Prompt