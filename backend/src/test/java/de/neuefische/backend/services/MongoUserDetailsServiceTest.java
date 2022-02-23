package de.neuefische.backend.services;

import de.neuefische.backend.models.UserMongo;
import de.neuefische.backend.repositories.MongoUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

class MongoUserDetailsServiceTest {

    private final MongoUserRepository userRepository = mock(MongoUserRepository.class);
    private final MongoUserDetailsService userService = new MongoUserDetailsService(userRepository);




    @Test
    void loadUserByUsername() {
        //Given
                UserMongo mockUser = UserMongo
                        .newUser("Klaus"
                                , "12345"
                                , List.of("API_READWRITE"));
//                User mockedUser = new User(mockUser);

        //When
        when(userRepository.findByUsername("Klaus")).thenReturn(Optional.ofNullable(mockUser));
        //Then
        UserDetails currentTestUser = userService.loadUserByUsername("Klaus");
//        assertEquals(mockUser, currentTestUser);
    }
}

//@ExtendWith(MockitoExtension.class)
//class UserServiceTest {
//
//    private final IUserRepo userRepo = mock(IUserRepo.class);
//    private final UserService userService = new UserService(userRepo);
//
//    @Test
//    public void loadUserByUsername() {
//        assertNotNull(userRepo);
//        User mockedUser = User.newUser("Julius", "jjj@ddd.cd", "Schmitz",
//                "userX", "kskskk", List.of(
//                        new SimpleGrantedAuthority("API_READWRITE")));
//        when(userRepo.findUserByUsername("Julius")).thenReturn(mockedUser);
//        UserService t = new UserService(userRepo);
//        User actualUser = t.loadUserByUsername("Julius");
//        assertEquals(mockedUser, actualUser);
//    }
//
//    @Test
//    void shouldThrowErrorIfLoadByUsernameFails() {
//        String nonExistUsername = "Oliver";
//        when(userRepo.findUserByUsername(nonExistUsername))
//                .thenReturn(null);
//
//        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername(nonExistUsername));
//    }
//
//    @Test
//    void getUserByPrincipal() {
//        Principal testPrincipal = () -> "Heinz";
//        User mockedUser = User.newUser("Heinz", "jjj@ddd.cd", "Schmitz",
//                "userX", "kskskk", List.of(
//                        new SimpleGrantedAuthority("API_READWRITE")));
//
//        when(userRepo.findUserByUsername("Heinz")).thenReturn(mockedUser);
//
//        assertEquals(mockedUser, userService.getUserByPrincipal(testPrincipal));
//    }
//
//    @Test
//    void shouldThrowErrorIfGetUserByPrincipalFails() {
//        assertThrows(UsernameNotFoundException.class, () -> userService.getUserByPrincipal(null));
//    }
//}