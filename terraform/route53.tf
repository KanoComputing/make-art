
# ACM Certificate generation

resource "aws_acm_certificate" "cert" {
  provider          = "aws.cloudfront"
  domain_name       = "*.${var.domain}"
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_route53_record" "cert_validation" {
  provider = "aws.main"
  name     = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_name}"
  type     = "${aws_acm_certificate.cert.domain_validation_options.0.resource_record_type}"
  zone_id  = "${data.aws_route53_zone.main.id}"
  records  = ["${aws_acm_certificate.cert.domain_validation_options.0.resource_record_value}"]
  ttl      = 60
  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = "aws.cloudfront"
  certificate_arn         = "${aws_acm_certificate.cert.arn}"
  validation_record_fqdns = ["${aws_route53_record.cert_validation.fqdn}"]
  lifecycle {
    create_before_destroy = true
  }
}

# Route 53 record for the static site

data "aws_route53_zone" "main" {
  provider     = "aws.main"
  name         = "${var.domain}"
  private_zone = false
}
