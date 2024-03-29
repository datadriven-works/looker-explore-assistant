resource "google_bigquery_dataset" "example_dataset" {
  project       = var.bq_example_project_id
  dataset_id    = var.bq_example_dataset_id_name
  friendly_name = var.bq_example_dataset_id_name
  description   = "Big Query dataset to store the examples for the explore assistant"
  location      = var.bg_example_location
  depends_on    = [time_sleep.wait_after_apis_activate]
}


resource "google_bigquery_table" "explore_generation_example_prompts" {
  dataset_id          = google_bigquery_dataset.example_dataset.dataset_id
  table_id            = "explore_generation_example_prompts"
  deletion_protection = false

  schema     = <<EOF
[
  {
    "name": "input_prompt",
    "type": "STRING",
    "mode": "REQUIRED"
  },  
  {
    "name": "output_query_args",
    "type": "STRING",
    "mode": "REQUIRED"
  }
]
EOF
  depends_on = [time_sleep.wait_after_apis_activate]
}

resource "google_bigquery_table" "explore_refinement_example_prompts" {
  dataset_id          = google_bigquery_dataset.example_dataset.dataset_id
  table_id            = "explore_refinement_example_prompts"
  deletion_protection = false

  schema     = <<EOF
[
  {
    "name": "prompt_list",
    "type": "JSON",
    "mode": "REQUIRED"
  },  
  {
    "name": "output_prompt",
    "type": "STRING",
    "mode": "REQUIRED"
  }
]
EOF
  depends_on = [time_sleep.wait_after_apis_activate]
}


resource "google_bigquery_job" "explore_generation_example_prompts" {
  job_id = "insert_default_explore_generation_prompts-${formatdate("YYYYMMDDhhmmss", timestamp())}"
  query {
    query              = <<EOF
INSERT INTO `${google_bigquery_dataset.example_dataset.project}.${google_bigquery_table.explore_generation_example_prompts.dataset_id}.${google_bigquery_table.explore_generation_example_prompts.table_id}` 
    (input_prompt, output_query_args)
VALUES
  ('customer with lifetime revenue > 100', 'fields=user_order_facts.lifetime_revenue&f[user_order_facts.lifetime_revenue]=>100&sorts=user_order_facts.lifetime_revenue desc 0&limit=500'),
  ('Customer who are currently active and made an order in the last day 30 days', 'fields=users.email,order_items.created_date&f[user_order_facts.currently_active_customer]=Yes&f[order_items.created_date]=last 30 days&sorts=order_items.created_date desc'),
  ('What s the total sales of brand Calvin Klein?', 'fields=order_items.total_sale_price&f[products.brand]=Calvin Klein&vis={\"type\":\"single_value\"}'),
  ('Orders that are still in Processing after 3 days, filtered by Distribution Center', 'fields=order_items.created_date,order_items.order_id,products.item_name,order_items.status,users.email,order_items.average_days_to_process&f[distribution_centers.name]=Chicago IL&f[order_items.created_date]=before 3 days ago&f[order_items.status]=Processing&sorts=order_items.created_date desc&column_limit=50&vis={\"type\":\"looker_grid\"}'),
  ('What\'s my sales for the last two years ? plot as bar chart', 'fields=order_items.total_sale_price&f[order_items.created_date]=2 years&sorts=order_items.total_sale_price descvis={\"type\":\"looker_bar\"}'),
  ('Severely delayed orders in Chicaco', 'fields=order_items.created_date,order_items.order_id,products.item_name,order_items.status,users.email,order_items.average_days_to_process&f[distribution_centers.name]=Chicago IL&f[order_items.created_date]=before 3 days ago&f[order_items.status]=Processing&column_limit=50'),
  ('30 Day Repeat Purchase Rate by Brand, column chart', 'fields=order_items.30_day_repeat_purchase_rate,products.brand&f[products.brand]=&sorts=order_items.30_day_repeat_purchase_rate desc 0&limit=500&vis={\"type\":\"looker_column\"}'),
  ('Top 10 Brand by Sales', 'fields=products.brand,order_items.total_sale_price&sorts=order_items.total_sale_price desc 0&limit=10&column_limit=50'),
  ('What\'s my sales for last 4 months by category ? plot as area', 'fields=products.category,order_items.total_sale_price&f[order_items.created_date]=4 months&limit=500&vis={\"type\":\"single_value\"}'),
  ('repeat purchase rate by category, plot as pie', 'fields=order_items.30_day_repeat_purchase_rate,products.category&vis={\"type\":\"looker_pie\"}'),
  ('average order sales by category, as bar chart', 'fields=order_items.average_sale_price,products.category&vis={\"type\":\"looker_bar\"}'),
  ('users with lifetime value > 100$ and made more than 4 orders, as table', 'fields=users.lifetime_revenue,users.lifetime_orders&f[users.lifetime_revenue]=>100&f[users.lifetime_orders]=>4&sorts=users.lifetime_revenue desc 0&vis={\"type\":\"looker_grid\"}'),
  ('sales for Columbia, Levi\'s and Nike this year, as bar chart', 'fields=products.brand,order_items.total_sale_price&f[products.brand]=Columbia,\"Levi\'s\", Nike&f[order_items.created_date]=this year&sorts=order_items.total_sale_price desc 0&limit=500&column_limit=50&vis={\"type\":\"looker_bar\"}'),
  ('number of orders this years vs last year', 'fields=order_items.count,order_items.created_year,order_items.created_month_name&pivots=order_items.created_year&f[order_items.created_year]=this year, last year&sorts=order_items.created_year desc,order_items.count desc 0&limit=5000&column_limit=50'),
  ('users by traffic source', 'fields=users.traffic_source,users.count&sorts=users.count desc 0&limit=500'),
  ('customers who likes columbia or levi\'s', 'fields=users.email,products.brand,order_items.total_sale_price&f[products.brand]=Columbia, Levi\'s&sorts=order_items.total_sale_price desc 0&limit=500'),
  ('Last week\'s revenue by category and department', 'fields=products.category,products.department,order_items.total_sale_price&pivots=products.department&order_items.created_year&f[order_items.created_date]=last week&sorts=order_items.total_sale_price desc 0&limit=500&column_limit=50'),
  ('Sales performance by state, on a map', 'fields=order_items.order_count,users.count,order_items.total_sale_price,order_items.average_spend_per_user,users.state&f[order_items.created_date]=90 days&sorts=order_items.total_sale_price desc&limit=500&column_limit=50&vis={\"type\"'),
  ('Who are the customer with highest revenue in New York?', 'fields=users.email,user_order_facts.lifetime_revenue&f[users.state]=New York&sorts=user_order_facts.lifetime_revenue desc 0&limit=500=vis_config={\"type\"'),
  ('Show monthly profit for the last year. Pivot on product category.Include only jeans vs. accessories.Display as an area chart.', 'fields=products.category,order_items.total_gross_margin,order_items.created_month_name&pivots=products.category&f[products.category]=Jeans, Accessories&f[order_items.created_date]=last year&sorts=order_items.created_month_name asc,order_items.total_gross_margin desc 0&limit=500&vis={\"type\":\"looker_area\"}');
EOF
    create_disposition = ""
    write_disposition  = ""
  }
}

resource "google_bigquery_job" "explore_refinement_example_prompts" {
  job_id = "insert_default_explore_refinement_prompts-${formatdate("YYYYMMDDhhmmss", timestamp())}"
  query {
    query              = <<EOF
INSERT INTO `${google_bigquery_dataset.example_dataset.project}.${google_bigquery_table.explore_refinement_example_prompts.dataset_id}.${google_bigquery_table.explore_refinement_example_prompts.table_id}` 
    (prompt_list, output_prompt)
VALUES
  ( JSON_ARRAY("make a chart of sales by region", "make it a an area chart", "make it a table"), 'make a chart of sales by region make it a table'),
  ( JSON_ARRAY("show me sales by region", "by product"), 'show me sales by region and product')

  ;

EOF
    create_disposition = ""
    write_disposition  = ""
  }
}

