# AWS Region for S3 and other resources
provider "aws" {
    version = "~> 1.41"
    region  = "eu-west-2"
    profile = "default"
    alias   = "main"
}

# AWS Region for Cloudfront (ACM certs only supports us-east-1)
provider "aws" {
    version = "~> 1.41"
    region  = "us-east-1"
    profile = "default"
    alias   = "cloudfront"
}