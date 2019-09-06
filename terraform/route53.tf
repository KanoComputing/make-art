
# ACM Certificate generation

resource "aws_acm_certificate" "cert" {
  provider          = "aws.cloudfront"
  domain_name       = "art.kano.me"

  subject_alternative_names = ["art-dev.kano.me", "art-staging.kano.me", "art-prod.kano.me"]
  validation_method = "DNS"
  lifecycle {
    create_before_destroy = true
  }
}
resource "aws_route53_record" "cert_validation" {
  count = "4"

  provider = "aws.cloudfront"
  zone_id  = "${element(data.aws_route53_zone.main.*.id, 0)}"

  name    = "${lookup(aws_acm_certificate.cert.domain_validation_options[count.index], "resource_record_name")}"
  type    = "${lookup(aws_acm_certificate.cert.domain_validation_options[count.index], "resource_record_type")}"
  records = ["${lookup(aws_acm_certificate.cert.domain_validation_options[count.index], "resource_record_value")}"]
  ttl     = 60

    lifecycle {
    create_before_destroy = true
  }
}

resource "aws_acm_certificate_validation" "cert" {
  provider                = "aws.cloudfront"
  certificate_arn         = "${aws_acm_certificate.cert.arn}"
  validation_record_fqdns = ["${aws_route53_record.cert_validation.*.fqdn}"]
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


resource "aws_route53_record" "dev" {
  provider = "aws.main"
  zone_id  = "${data.aws_route53_zone.main.zone_id}"
  name     = "art-dev.kano.me"
  type     = "A"

  alias {
    name    = "${module.dev.cf_domain_name}"
    zone_id = "${module.dev.cf_hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "staging" {
  provider = "aws.main"
  zone_id  = "${data.aws_route53_zone.main.zone_id}"
  name     = "art-staging.kano.me"
  type     = "A"

  alias {
    name    = "${module.staging.cf_domain_name}"
    zone_id = "${module.staging.cf_hosted_zone_id}"
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "prod" {
  provider = "aws.main"
  zone_id  = "${data.aws_route53_zone.main.zone_id}"
  name     = "art-prod.kano.me"
  type     = "A"

  alias {
    name    = "${module.prod.cf_domain_name}"
    zone_id = "${module.prod.cf_hosted_zone_id}"
    evaluate_target_health = false
  }
}