package de.neuefische.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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
