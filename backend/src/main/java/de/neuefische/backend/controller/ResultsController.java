package de.neuefische.backend.controller;

import de.neuefische.backend.models.LetterData;
import de.neuefische.backend.services.JWTUtils;
import de.neuefische.backend.models.ResultsData;
import de.neuefische.backend.services.ResultsService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@RestController
@RequestMapping("/api/abc/results")
public class ResultsController {
    private static final Log LOG = LogFactory.getLog(ResultsController.class);
    private final ResultsService resultsService;
    private final JWTUtils jwtutils = new JWTUtils();

    public ResultsController(ResultsService resultsService) {
        this.resultsService = resultsService;
    }


    @GetMapping(path = "")
    @ResponseBody
    public ResultsData getAllResultsForThisUser(Principal principal) {
        LOG.info("get all results for user");
        return resultsService.getResultsByName(principal.getName());
    }

    @PostMapping(path = "")
    public void sendLetterResultToBackendForThisUser(@RequestBody LetterData letter, Principal principal) {
        LOG.info("send one letter: " + letter + ", result for user " + principal.getName() + "to backend");
        resultsService.sentLetterResultToDB(letter.getLetter(), principal.getName());
    }

}



