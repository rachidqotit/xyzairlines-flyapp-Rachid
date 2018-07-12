package com.xyzairlines.flyApp.frontend;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.Map;

@Controller
@RequestMapping(value = "/")
public class HomeController {


    // when I type in: http://localhost:8080/
    // then it returns "index" which will then look
    // in src/main/resources/templates and return the content
    // of the file index.mustache
    // while rendering the header and footer in using the
    // mustache operator ( {{>header}} and {{>footer}}
    @RequestMapping(method = RequestMethod.GET)
    public String home(Map<String, Object> model) {
        return "index";
    }
    @RequestMapping(value = "/airplanes", method = RequestMethod.GET)
    public String jqueryPostGet(Map<String, Object> model) {
        return "airplanes";
    }

}
