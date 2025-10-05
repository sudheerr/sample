package com.inventory.management.config;

import com.inventory.management.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if not exists
        if (!userService.usernameExists("admin")) {
            userService.registerUser("admin", "admin123");
            System.out.println("Default admin user created - Username: admin, Password: admin123");
        }
    }
}
