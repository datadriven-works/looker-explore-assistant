const General_VisualizationTraining_Prompt_for_Vertex_AI = `General VisualizationTraining Prompt for Vertex AI

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
export default General_VisualizationTraining_Prompt_for_Vertex_AI