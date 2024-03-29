
#
# REQUIRED VARIABLES
#

variable "project_id" {
  type = string
  description = "GCP Project ID"
}

variable "backend_type" {
  type = string
  description = "values: cloud_run, bigquery"
}

#
# VARIABLES WITH DEFAULTS
#

variable "deployment_region" {
  type = string
  description = "Region to deploy the Cloud Run service. Example: us-central1"
  default = "us-central1"
}

variable "cloud_run_service_name" {
    type = string
    default = "explore-assistant-api"
}