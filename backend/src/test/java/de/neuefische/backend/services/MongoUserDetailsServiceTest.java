package de.neuefische.backend.services;

import de.neuefische.backend.models.UserMongo;
import de.neuefische.backend.repositories.MongoUserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
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

        //When
        when(userRepository.findByUsername("Klaus")).thenReturn(Optional.ofNullable(mockUser));
        //Then
        UserDetails currentTestUser = userService.loadUserByUsername("Klaus");
        assertEquals(mockUser.getUsername(), currentTestUser.getUsername());
    }

    @Test
    void shouldThrowErrorIfLoadByUsernameFails() {
        String notExisting = "Hans";
        when(userRepository.findByUsername(notExisting))
                .thenReturn(Optional.empty());

        assertThrows(UsernameNotFoundException.class, () -> userService.loadUserByUsername(notExisting));
    }
}