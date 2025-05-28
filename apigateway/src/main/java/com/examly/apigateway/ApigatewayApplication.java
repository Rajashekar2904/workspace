package com.examly.apigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
@EnableEurekaClient
public class ApigatewayApplication {
	public static void main(String[] args) {
		SpringApplication.run(ApigatewayApplication.class, args);
	}

	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("springbank", r -> r.path("/api/account/**", "/api/fixeddeposit/**", "/api/recurringdeposit/**", "/api/transaction/**")
						.uri("lb://springbank"))
				.route("springappuser", r -> r.path("/api/auth/**")
						.uri("lb://springappuser"))
				.route("springnotifications", r -> r.path("/api/notification/**")
						.uri("lb://springnotifications"))
				.build();
	}
}