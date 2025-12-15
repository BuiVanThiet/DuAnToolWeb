package org.example.combotooldoihotro.rootServices;

import org.example.combotooldoihotro.rootEntites.Staff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    StaffService staffService;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Staff staffLogin = this.staffService.getStaffByEmail(username).orElseThrow(() ->
                new UsernameNotFoundException("Email không tồn tại!"));
        return org.springframework.security.core.userdetails.User
                .withUsername(staffLogin.getEmail())
                .password(staffLogin.getPassword()) // password đã mã hoá BCrypt
                .build();
    }

    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
