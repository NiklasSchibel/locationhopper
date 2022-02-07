package de.neuefische.backend.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Date;
import java.util.Map;

@Service
public class JWTUtils {

    //todo change secret
    //@Value(value="${SECRET_KEY}")
    //set SECRET KEY into environment variable to run configuration/modify
    // rename to private String secret;
    static final String secret = "derSecretWirdSpaeterInDieHerokuConfigVariableGeschrieben";

    public String createToken(Map<String, Object> claims, String subject, int timeout) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(Date.from(Instant.now()))
                .setExpiration(Date.from(Instant.now().plus(Duration.ofMinutes(timeout))))
                .signWith(SignatureAlgorithm.HS256, secret)
                .compact();
    }

    public String extractUserName(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getSubject();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        Claims claims = extractAllClaims(token);
        return claims.getExpiration().before(new Date());
    }

    public Boolean validateToken(String token, String username) {
        String userName = extractUserName(token);
        return (userName.equals(username) && !isTokenExpired(token));
    }

}