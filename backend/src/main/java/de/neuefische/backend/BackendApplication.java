package de.neuefische.backend;

import de.neuefische.backend.models.UserMongo;
import de.neuefische.backend.repositories.MongoUserRepository;
import de.neuefische.backend.services.MongoUserDetailsService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class BackendApplication {
//    private static final Log LOG = LogFactory.getLog(BackendApplication.class);

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

//    @Autowired
//    MongoUserRepository repository;
//
//    PasswordEncoder encoder = new Argon2PasswordEncoder();
//
//    @Override
//    public void run(String... args) throws Exception {
//        final String encodedPassword = encoder.encode("klaus");
//
//        final UserMongo user = UserMongo.builder()
//                .username("klaus")
//                .password(encodedPassword)
//                .rights(List.of(MongoUserDetailsService.AUTHORITY_API_READWRITE)).build();
//
//        try {
//            repository.insert(user);
//        } catch (Exception e) {
//            LOG.info("User " + user.getUsername().toUpperCase() + " already exists");
//        }
//        LOG.info("All current Users: " + repository.findAll());
//    }
}
