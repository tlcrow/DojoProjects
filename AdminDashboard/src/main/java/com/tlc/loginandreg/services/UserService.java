package com.tlc.loginandreg.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.tlc.loginandreg.models.Role;
import com.tlc.loginandreg.models.User;
import com.tlc.loginandreg.repositories.RoleRepository;
import com.tlc.loginandreg.repositories.UserRepository;

@Service
public class UserService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    
    public UserService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder)     {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    
    
    // 1
    public void saveWithUserRole(User user) {
        List<Role> roles = Arrays.asList(roleRepository.findByName("ROLE_USER"));
    		user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(roles);
        userRepository.save(user);
    }
     
     // 2 
    public void saveUserWithAdminRole(User user) {
    		ArrayList<Role> userRoles = new ArrayList<Role>();
    		userRoles.add((Role) roleRepository.findByName("ROLE_ADMIN"));
    		userRoles.add((Role) roleRepository.findByName("ROLE_USER"));
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setRoles(userRoles);
        userRepository.save(user);
    }    
    
    // 3
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    
    public void destroyUser(long id) {
		userRepository.delete(id);
	}
    
    public List<User> all(){return (List<User>) userRepository.findAll();}
    public User getById(long id){return userRepository.findOne(id);}
    public void update(User user){userRepository.save(user);}


	public List<User> findAll() {
		return userRepository.findAll();
	}
    
}

