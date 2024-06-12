const Looker_Table_Chart_explanation_prompt = `Looker Classic Table Chart Visualizations using Highcharts

Objective: Create a system that allows users to generate Looker Classic visualizations (specifically table charts) using natural language queries. The system should translate user requests into LookML queries and then produce the corresponding Highcharts JavaScript code to render the visualization.
What are Table Charts Used For?
Table charts are essential for displaying structured data in a clear, organized, and easily readable format. They excel in presenting detailed information, enabling users to quickly identify trends, patterns, and specific data points. Here's a breakdown of their common use cases:
Data Exploration: Tables allow users to examine data in its raw form, providing a comprehensive view of all relevant metrics and dimensions. This is crucial for understanding the underlying data structure and identifying potential areas of interest.
Detailed Reporting: Table charts are ideal for generating reports that present a wide array of data points, making it easy to compare different metrics across various dimensions. This is helpful for tracking progress, analyzing performance, and identifying trends.
Data Comparison: Tables can effectively display multiple metrics or dimensions side by side, making it simple to compare data points and identify differences or similarities. This is useful for benchmarking performance, evaluating different options, or analyzing historical trends.
Filtering and Sorting: Table charts can be easily filtered and sorted, allowing users to focus on specific data segments and quickly identify key insights. This is crucial for data analysis, as it enables users to drill down into specific areas of interest and gain a deeper understanding of the data.
Data Validation: Tables provide a clear visual representation of data, making it easy to spot errors, inconsistencies, or unusual data points. This is essential for ensuring data quality and accuracy.
Important Considerations:
Data Structure: Table charts are most suitable for displaying data that has a clear, well-defined structure with distinct rows and columns. They are not ideal for unstructured data or data that requires complex visualizations.
Column Widths: Adjust column widths to ensure that data is displayed clearly and legibly. Avoid overly wide columns that make the table difficult to read.
Data Formatting: Apply appropriate formatting to numbers, dates, and other data types to enhance readability and comprehension.
Conditional Formatting: Utilize conditional formatting to highlight specific data points, trends, or patterns, making it easier to identify critical information.
NLQ Example Questions for When to Use Table Charts:
As a Looker and data visualization expert, understanding the context of a user's question is crucial in selecting the most appropriate visualization. While a table chart is versatile for displaying detailed data, it's not always the best option.
The provided examples showcase common business scenarios where a table chart is an excellent choice because it clearly presents specific data points and facilitates comparisons across various metrics. These questions often involve examining detailed data, comparing values, analyzing historical trends, or tracking progress.
However, it's essential to consider alternative visualizations when the context demands it. For instance, if the user is interested in showcasing trends over time, a line chart might be more suitable. If the focus is on comparing categories, a bar chart could be a better choice. And if the goal is to explore relationships between variables, a scatter plot might be more informative.
To determine the most appropriate visualization, carefully analyze the user's question, paying attention to the following aspects:
Type of data: Is it structured with rows and columns or unstructured and requiring complex visualizations?
Focus of the question: Is the user interested in detailed data, trends over time, comparisons between groups, distributions, or relationships?
Level of detail: Does the user need a high-level overview or a detailed breakdown of the data?
Communication goal: What message or insight is the user trying to convey with the visualization?
By considering these factors, you can confidently select the visualization that best aligns with the user's needs and effectively communicates the insights hidden within their data.
\[
  {
    "input": "Show me the sales figures for each product category in the last quarter.",
    "output": "A table chart can effectively display detailed sales figures for each product category, allowing for easy comparison and analysis."
  },
  {
    "input": "What are the customer demographics for our top 10 customers?",
    "output": "A table chart can present detailed information about the demographics of your top customers, including age, location, and other relevant attributes."
  },
  {
    "input": "How many orders have been placed by each customer in the past year?",
    "output": "A table chart can provide a clear view of the number of orders placed by each customer, allowing for easy analysis and identification of frequent buyers."
  },
  {
    "input": "What is the average order value for each region?",
    "output": "A table chart can display the average order value for each region, enabling comparisons and identification of areas with higher spending."
  },
  {
    "input": "List all the marketing campaigns and their respective ROI.",
    "output": "A table chart can present a list of marketing campaigns alongside their corresponding return on investment, providing a clear comparison and evaluation of campaign performance."
  },
  {
    "input": "What are the top 5 performing products by revenue?",
    "output": "A table chart can display the top 5 products ranked by revenue, allowing for easy identification of the most successful products."
  },
  {
    "input": "Show me the list of employees and their respective salary information.",
    "output": "A table chart can effectively display a list of employees alongside their salary information, providing a clear overview of employee compensation."
  },
  {
    "input": "Compare the performance of our sales team members by number of deals closed.",
    "output": "A table chart can provide a side-by-side comparison of sales team members, allowing for easy analysis of their performance based on the number of deals closed."
  },
  {
    "input": "Show me the breakdown of our inventory by product category.",
    "output": "A table chart can provide a clear view of the inventory breakdown by product category, allowing for easy analysis and identification of areas where inventory levels might be too high or too low."
  },
  {
    "input": "List all customer support tickets and their status.",
    "output": "A table chart can provide a list of customer support tickets, their current status, and other relevant information, allowing for effective tracking and management of customer support requests."
  }
]
\Configuration Options
Examining the configuration options available for the Table Chart in Looker Classic is essential for understanding how to translate natural language into specific code. Here's a breakdown of those options, focusing on the Table Chart:
Fields:
Columns: These are the fields that will be displayed in the table's columns. These fields can be of various data types:
Numeric: Display numbers (e.g., sales figures, order quantities).
Date: Display dates (e.g., order dates, customer birth dates).
String: Display text values (e.g., product names, customer names).
Boolean: Display true/false values (e.g., active customer status).
Rows: These define the rows of the table. Rows are often determined by a specific field (e.g., customer ID, product category).
Totals: You can choose to display a total row that sums the values of each column (if applicable).
Row Totals: You can choose to display row totals, which sum the values of each row.
Filters:
Filters: These are applied to the data before it's sent to the table, ensuring that only the relevant data is displayed. You can use any combination of LookML-defined filters to refine the data set.
Visualization Options:
Table Theme: Sets the visual theme for the table (e.g., "white", "dark").
Font Size: Adjusts the font size for header and row values.
Text Alignment: Determines the text alignment for header and row values.
Column Widths: Sets the width for each column in the table.
Conditional Formatting: Applies different colors or styles to table cells based on data values. This helps to highlight important trends or patterns.
Data Transformations:
LookML: Looker's query language, LookML, allows you to perform transformations on your data before it's sent to the table. This includes:
Calculations: Creating new fields with calculated values (e.g., average order value, profit margin).
Aggregation: Summing, averaging, or counting data based on certain dimensions (e.g., total sales by product category).
Filtering: Applying filters based on specific conditions.
Renaming: Changing the names of fields or dimensions.
Example:
Let's say you want to see a table of customer orders with the following information:
Customer ID: Unique identifier for each customer.
Order Date: The date the order was placed.
Order Total: The total value of the order.
Shipping Address: The shipping address for the order.
You can translate this into a LookML query and then use the Table Chart configuration to create the visualization.
The Importance of Understanding Data Transformations:
LookML's ability to transform data before it reaches the table is critical for this natural language interface. It means you can't just focus on the table itself; you also need to be aware of how the data is prepared in LookML to understand how different user queries would affect the final visualization.
How to Leverage This Information for Your Natural Language Interface:
Map User Language to LookML: You need to build a system that can translate user questions like: "Show me a list of customer orders with their order date, total, and shipping address" into the corresponding LookML query and table settings.
Identify Data Transformations: You'll need to understand how LookML affects the data, so you can determine which fields are available, which transformations are required, and how those transformations will affect the table's appearance.
Explanation of Code Snippet for Vertex AI:
This JSON we're looking at here is like a blueprint for how we want our Looker visualization to look and act. The important part is the type field set to "looker_grid". This tells Vertex AI that we're working with a specific kind of chart \– a Looker table chart.
Think of it like this: Vertex AI is trying to understand your request, and giving it this blueprint helps it figure out what you're aiming for. It knows it's dealing with a table chart and not, say, a bar chart or a pie chart.
Here's why this is important:
Data Understanding: Vertex AI needs to know the type of chart to correctly process the data. A table chart displays data in a structured format, while a bar chart compares categories. Knowing this is critical.
Helpful Suggestions: Vertex AI can now offer smart suggestions tailored to table charts. It might say, "Hey, you want to see customer details? Let's add columns for customer name, order date, and order total." It also knows what LookML functions are good for structuring data into table format.
Code Generation: If you ask Vertex AI to generate code for this chart, it can use this JSON to create the right Highcharts options. It knows to use Highcharts.chart and to set the right properties for a table chart.
For example:
\{
  "vis": {
    "show_view_names": true,
    "show_row_numbers": true,
    "transpose": false,
    "truncate_text": true,
    "hide_totals": false,
    "hide_row_totals": false,
    "size_to_fit": true,
    "table_theme": "white",
    "limit_displayed_rows": true,
    "enable_conditional_formatting": true,
    "header_text_alignment": "left",
    "header_font_size": "12",
    "rows_font_size": "12",
    "conditional_formatting_include_totals": true,
    "conditional_formatting_include_nulls": true,
    "show_sql_query_menu_options": false,
    "show_totals": true,
    "show_row_totals": true,
    "truncate_header": true,
    "minimum_column_width": 75,
    "limit_displayed_rows_values": {
      "show_hide": "hide",
      "first_last": "first",
      "num_rows": 0
    },
    "series_types": {},
    "type": "looker_grid",
    "defaults_version": 1,
    "x_axis_gridlines": false,
    "y_axis_gridlines": true,
    "show_y_axis_labels": true,
    "show_y_axis_ticks": true,
    "y_axis_tick_density": "default",
    "y_axis_tick_density_custom": 5,
    "show_x_axis_label": true,
    "show_x_axis_ticks": true,
    "y_axis_scale_mode": "linear",
    "x_axis_reversed": false,
    "y_axis_reversed": false,
    "plot_size_by_field": false,
    "trellis": "",
    "stacking": "",
    "legend_position": "center",
    "point_style": "none",
    "show_value_labels": false,
    "label_density": 25,
    "x_axis_scale": "auto",
    "y_axis_combined": true,
    "ordering": "none",
    "show_null_labels": false,
    "show_totals_labels": false,
    "show_silhouette": false,
    "totals_color": "#808080"
  }
}
\This JSON code describes the visual settings for the Looker Classic table chart. You can see the "type" field is set to "looker_grid" which lets Vertex AI understand that you want a table.
And here\’s an example of the Looker encoded URL for the table chart visualization and configurations:
vis=%7B%22show_view_names%22%3Atrue%2C%22show_row_numbers%22%3Atrue%2C%22transpose%22%3Afalse%2C%22truncate_text%22%3Atrue%2C%22hide_totals%22%3Afalse%2C%22hide_row_totals%22%3Afalse%2C%22size_to_fit%22%3Atrue%2C%22table_theme%22%3A%22white%22%2C%22limit_displayed_rows%22%3Atrue%2C%22enable_conditional_formatting%22%3Atrue%2C%22header_text_alignment%22%3A%22left%22%2C%22header_font_size%22%3A%2212%22%2C%22rows_font_size%22%3A%2212%22%2C%22conditional_formatting_include_totals%22%3Atrue%2C%22conditional_formatting_include_nulls%22%3Atrue%2C%22show_sql_query_menu_options%22%3Afalse%2C%22show_totals%22%3Atrue%2C%22show_row_totals%22%3Atrue%2C%22truncate_header%22%3Atrue%2C%22minimum_column_width%22%3A75%2C%22limit_displayed_rows_values%22%3A%7B%22show_hide%22%3A%22hide%22%2C%22first_last%22%3A%22first%22%2C%22num_rows%22%3A0%7D%2C%22series_types%22%3A%7B%7D%2C%22type%22%3A%22looker_grid%22%2C%22defaults_version%22%3A1%2C%22x_axis_gridlines%22%3Afalse%2C%22y_axis_gridlines%22%3Atrue%2C%22show_y_axis_labels%22%3Atrue%2C%22show_y_axis_ticks%22%3Atrue%2C%22y_axis_tick_density%22%3A%22default%22%2C%22y_axis_tick_density_custom%22%3A5%2C%22show_x_axis_label%22%3Atrue%2C%22show_x_axis_ticks%22%3Atrue%2C%22y_axis_scale_mode%22%3A%22linear%22%2C%22x_axis_reversed%22%3Afalse%2C%22y_axis_reversed%22%3Afalse%2C%22plot_size_by_field%22%3Afalse%2C%22trellis%22%3A%22%22%2C%22stacking%22%3A%22%22%2C%22legend_position%22%3A%22center%22%2C%22point_style%22%3A%22none%22%2C%22show_value_labels%22%3Afalse%2C%22label_density%22%3A25%2C%22x_axis_scale%22%3A%22auto%22%2C%22y_axis_combined%22%3Atrue%2C%22ordering%22%3A%22none%22%2C%22show_null_labels%22%3Afalse%2C%22show_totals_labels%22%3Afalse%2C%22show_silhouette%22%3Afalse%2C%22totals_color%22%3A%22%23808080%22%7D&filter_config=%7B%7D&origin=share-expanded
Explanation of Key Elements:
type: Specifies the visualization type. Here, we use "looker_grid" indicating a table chart.
show_view_names: Determines whether to display the names of the underlying LookML views.
show_row_numbers: Includes row numbers in the table.
transpose: Transposes the table to switch rows and columns.
truncate_text: Truncates long text values to fit within the table cell.
hide_totals: Hides the total row for the table.
hide_row_totals: Hides the row totals (sums of each column) in the table.
size_to_fit: Allows the table to automatically adjust its width to fit the available space.
table_theme: Specifies the visual theme for the table (e.g., "white", "dark").
limit_displayed_rows: Determines whether to limit the number of rows displayed.
enable_conditional_formatting: Enables conditional formatting for table cells, applying different colors or styles based on data values.
header_text_alignment: Sets the alignment of text in the table header (e.g., "left", "center", "right").
header_font_size: Specifies the font size for table header text.
rows_font_size: Sets the font size for table row values.
conditional_formatting_include_totals: Includes totals in the conditional formatting calculations.
conditional_formatting_include_nulls: Includes null values (empty cells) in the conditional formatting calculations.
show_sql_query_menu_options: Displays the menu options for viewing and modifying the underlying SQL query.
show_totals: Shows the total row for the table.
show_row_totals: Shows the row totals (sums of each column).
truncate_header: Truncates long header text to fit within the table column.
minimum_column_width: Sets the minimum width for each table column.
limit_displayed_rows_values:
show_hide: Controls whether to show or hide rows based on the "first_last" and "num_rows" settings.
first_last: Determines which rows to hide (e.g., "first" hides the first few rows).
num_rows: Specifies the number of rows to hide.
Note: These are just a few examples; there are many other visualization settings available in Looker to customize your table charts. Refer to the official Looker documentation for a complete list of options.
Expanded Looker Table Chart Example:
Here's an expanded example demonstrating various ways to customize your Looker table chart, including:
Basic Table Chart with Multiple Columns:
\{
  "query": {
    "view": "your_view_name",
    "fields": [
      "order_items.product_name",
      "order_items.order_date",
      "order_items.quantity",
      "order_items.unit_price",
      "order_items.total_price"
    ],
    "filters": {
      "order_items.order_date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "sorts": [
      "order_items.order_date asc"
    ],
    "visualization": {
      "type": "looker_grid"
    }
  }
}
\Table Chart with Conditional Formatting:
\{
  "query": {
    "view": "your_view_name",
    "fields": [
      "order_items.product_name",
      "order_items.order_date",
      "order_items.quantity",
      "order_items.unit_price",
      "order_items.total_price"
    ],
    "filters": {
      "order_items.order_date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "sorts": [
      "order_items.order_date asc"
    ],
    "visualization": {
      "type": "looker_grid",
      "enable_conditional_formatting": true,
      "conditional_formatting": [
        {
          "field": "order_items.quantity",
          "type": "GREATER_THAN",
          "value": 10,
          "color": "#FF0000"  // Red color for quantities greater than 10
        },
        {
          "field": "order_items.total_price",
          "type": "LESS_THAN",
          "value": 50,
          "color": "#FFFF00"  // Yellow color for total prices less than 50
        }
      ]
    }
  }
}
\Table Chart with Custom Column Widths:
\{
  "query": {
    "view": "your_view_name",
    "fields": [
      "order_items.product_name",
      "order_items.order_date",
      "order_items.quantity",
      "order_items.unit_price",
      "order_items.total_price"
    ],
    "filters": {
      "order_items.order_date": {
        "from": "2023-01-01",
        "to": "2023-03-31"
      }
    },
    "sorts": [
      "order_items.order_date asc"
    ],
    "visualization": {
      "type": "looker_grid",
      "column_widths": {
        "order_items.product_name": 200,
        "order_items.order_date": 100,
        "order_items.quantity": 50,
        "order_items.unit_price": 80,
        "order_items.total_price": 80
      }
    }
  }
}
\

`
export default Looker_Table_Chart_explanation_prompt