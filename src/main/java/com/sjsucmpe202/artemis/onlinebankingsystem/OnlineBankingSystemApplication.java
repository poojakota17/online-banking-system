package com.sjsucmpe202.artemis.onlinebankingsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableJpaAuditing
@EnableSwagger2
public class OnlineBankingSystemApplication {

    public static void main(String[] args) {
        SpringApplication.run(OnlineBankingSystemApplication.class, args);
    }

}
