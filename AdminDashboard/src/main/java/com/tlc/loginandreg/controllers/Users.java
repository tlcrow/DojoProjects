package com.tlc.loginandreg.controllers;

import java.security.Principal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.tlc.loginandreg.models.Role;
import com.tlc.loginandreg.models.User;
import com.tlc.loginandreg.services.RoleService;
import com.tlc.loginandreg.services.UserService;
import com.tlc.loginandreg.validator.UserValidator;

@Controller
public class Users {
    private UserService userService;
    private UserValidator userValidator;
    private RoleService roleService;
    
    public Users(UserService userService, UserValidator userValidator, RoleService roleService) {
        this.userService = userService;
        this.userValidator = userValidator;
        this.roleService = roleService;
    }
    
    @RequestMapping(value={"/","/dashboard"})
	public String dashboard(Principal principal,Model model){
    		User user = userService.findByUsername(principal.getName());
    		user.setUpdatedAt(new Date());
    		userService.update(user);
		model.addAttribute("currentUser",user);
		if (user.checkIfAdmin()) {
			return "redirect:/admin";
		}
		else {
		return "homePage.jsp";
		}
    }
    
    @RequestMapping({"/login", "/registration"})
    public String registerForm(@Valid @ModelAttribute("user") User user, @RequestParam(value="error", required=false) String error, @RequestParam(value="logout", required=false) String logout, Model model) {
    	if(error != null) {
            model.addAttribute("errorMessage", "Invalid Credentials, Please try again.");
        }
        if(logout != null) {
            model.addAttribute("logoutMessage", "Logout Successfull!");
        }
        return "registrationPage.jsp";
    }
    
    @PostMapping("/registration")
    public String registration(@Valid @ModelAttribute("user") User user, BindingResult result, Model model) {
        // NEW
        userValidator.validate(user, result);

        if (result.hasErrors()) {
            return "registrationPage.jsp";
        }
        if(userService.findByUsername(user.getUsername()) != null) {
        	 	model.addAttribute("errorMessage", "Username already exist. Please login.");
        		return "registrationPage.jsp";
        }
        if(userService.findAll().size() < 1){
        		userService.saveUserWithAdminRole(user);
        		model.addAttribute("errorMessage", "Email created. Please login.");
        		return "registrationPage.jsp";
        }
        else {
        		userService.saveWithUserRole(user);
            model.addAttribute("errorMessage", "Email created. Please login.");
            return "registrationPage.jsp";
        }
    }
    
    @RequestMapping("/admin")
    public String adminPage(Principal principal, Model model) {
        String username = principal.getName();
        model.addAttribute("currentUsers", userService.findAll());
        return "dashboard.jsp";
    }
    
    @RequestMapping("/admin/delete/{id}")
	public String delete(@PathVariable("id") long id){
		userService.destroyUser(id);
		return "redirect:/admin";
	}
    
    @RequestMapping("/admin/promote/{id}")
	public String promote(@PathVariable("id") long id){
    		User user = userService.getById(id);
		List<Role> roles = user.getRoles();
		roles.add(roleService.findByName("ROLE_ADMIN"));
		userService.update(user);
		return "redirect:/admin";
	}
}

