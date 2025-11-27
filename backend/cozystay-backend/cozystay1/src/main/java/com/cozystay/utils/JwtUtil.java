package com.cozystay.utils;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.SignatureAlgorithm;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    // 256-bit secure key (MUST be >=32 bytes)
    private static final String SECRET_KEY = 
        "pRcH1x2uE9B7NzA6QVX8LkZ3nSmW0tY5qP4rT8uV0xY2zH7kF3J6L9M2Q1sB4eD";

    private static final Key KEY = 
        Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));

    public static String generateToken(String username, String role) {
        return Jwts.builder()
                .claim("username", username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 3600 * 1000)) // 1 hour
                .signWith(KEY, SignatureAlgorithm.HS256)
                .compact();
    }

    public static boolean validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(KEY)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return true;

        } catch (Exception e) {
            return false;
        }
    }
}
