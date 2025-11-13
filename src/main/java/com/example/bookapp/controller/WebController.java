package com.example.bookapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.ui.Model;

@Controller
public class WebController {

    @GetMapping("/")
    public String index(Model model) {
    model.addAttribute("pageTitle", "Gestionnaire de Livres");
    return "index"; 
}
    @GetMapping("/graphql-ui")
    public String graphqlUI() { 
        return "graphql-ui"; 
    }
    
}
