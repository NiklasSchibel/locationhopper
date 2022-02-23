package de.neuefische.backend.services;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class JWTUtilsTest {

    @Test
    void createToken() {
    }

    @Test
    void extractUserName() {
    }

    @Test
    void validateToken() {
    }
}



//@SpringBootTest
//class JWTServiceTest {
//
//    private static final MockedStatic<Date> staticDate = mockStatic(Date.class);
//    private final String actualToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUaXppYW4iLCJleHAiOjAsImlhdCI6MH0.9z7Q2p6ZlLAuABX-2fE_ouij1YjhsIAWnewZ4D2blks";
//    @Autowired
//    private JWTService underTest;
//    private MongoUser user;
//
//    @BeforeAll
//    static void initAll() {
//        staticDate.when(() -> Date.from(any(Instant.class))).thenReturn(new Date(0));
//    }
//
//    @BeforeEach
//    void init() {
//        user = TestDataProvider.testUser();
//    }
//
//    @Test
//    void shouldReturnTokenForUser() {
//        String token = underTest.createToken(user);
//
//        assertEquals(actualToken, token);
//    }
//
//    @Test
//    void shouldReturnTrueIfTokenIsValid() {
//        String name = user.getUsername();
//
//        assertTrue(underTest.validateToken(actualToken, name));
//    }
//
//}



//class LoginServiceTest {
//
//    private final AuthenticationManager authManager = mock(AuthenticationManager.class);
//    private final JWTService jwtService = mock(JWTService.class);
//    private final LoginService underTest = new LoginService(authManager, jwtService);
//
//    @Test
//    void shouldThrowErrorIfLoginFails() {
//        MongoUser user = TestDataProvider.testUser();
//        when(authManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
//                .thenThrow(mock(AuthenticationException.class));
//
//        assertThrows(ResponseStatusException.class, () -> underTest.login(user));
//    }
//
//    @Test
//    void shouldReturnNewUserToken() {
//        MongoUser user = TestDataProvider.testUser();
//        when(jwtService.createToken(any(MongoUser.class))).thenReturn(user.getId());
//
//        assertEquals(user.getId(), underTest.login(user));
//
//    }
//}


//@ExtendWith(MockitoExtension.class)
//public class LoginServiceTest {
//
//    private final AuthenticationManager authenticationManager = mock(AuthenticationManager.class);
//    private final JWTUtils jwtUtils = mock(JWTUtils.class);
//    private final LoginService loginService = new LoginService(jwtUtils, authenticationManager);
//
//    @Test
//    void shouldThrowErrorIfLoginFails() {
//        LoginData loginData = new LoginData("Fridolin", "fRi125!");
//        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
//                .thenThrow(mock(AuthenticationException.class));
//        assertThrows(ResponseStatusException.class, () -> loginService.loginUser(loginData));
//    }
//
//    @Test
//    void shouldReturnNewUserToken() {
//        LoginData loginData = new LoginData("Fridolin", "fRi125!");
//        when(jwtUtils.createToken(any(LoginData.class))).thenReturn("123");
//        assertEquals("123", loginService.loginUser(loginData));
//    }
//}
