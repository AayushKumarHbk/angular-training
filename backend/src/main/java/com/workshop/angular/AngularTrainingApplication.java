package com.workshop.angular;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories("com.workshop.angular.repository")
public class AngularTrainingApplication {

	public static void main(String[] args) {
		SpringApplication.run(AngularTrainingApplication.class, args);
	}

}
