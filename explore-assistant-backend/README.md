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

changes to the code in `explore-assistant-cloud-function` will result in a zip file with a new hash. Since the hash is added to the environment variables for the cloud function, a new hash will cause the cloud function to redeploy.