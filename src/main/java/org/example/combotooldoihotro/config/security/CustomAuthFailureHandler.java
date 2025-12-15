package org.example.combotooldoihotro.config.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class CustomAuthFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String errorMessage = "Sai thông tin đăng nhập";

        if (exception instanceof BadCredentialsException) {
            errorMessage = "Sai username hoặc password";
        }

        response.sendRedirect("/login?errorMsg=" +
                URLEncoder.encode(errorMessage, StandardCharsets.UTF_8));
    }
}
