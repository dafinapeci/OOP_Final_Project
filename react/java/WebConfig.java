package com.spotiver2;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        //all permission for the application
        registry.addMapping("/**")  
                .allowedOrigins("http://localhost:--secret--")  // only allows domain
                .allowedMethods("GET", "POST", "PUT", "DELETE")  // choose to letting which domains will allowing 
                .allowedHeaders("*")  
                .allowCredentials(true);  
    }
}
