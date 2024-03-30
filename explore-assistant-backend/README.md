# Explore Assistant Backend

Cloud fundction 

```
cd terraform 
export TF_VAR_project_id=XXX
export TF_VAR_use_bigquery_backend=0
export TF_VAR_use_cloud_function_backend=1
terraform plan
terraform apply
```

BigQuery

```
cd terraform 
export TF_VAR_project_id=XXX
export TF_VAR_use_bigquery_backend=1
export TF_VAR_use_cloud_function_backend=0
terraform plan
terraform apply
```