package de.neuefische.backend.controller;

import de.neuefische.backend.models.LetterObject;
import de.neuefische.backend.services.JWTUtils;
import de.neuefische.backend.models.ResultsData;
import de.neuefische.backend.services.ResultsService;
import org.apache.juli.logging.Log;
import org.apache.juli.logging.LogFactory;
import org.springframework.web.bind.annotation.*;



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
    public ResultsData getAllResultsForThisUser(@RequestHeader("Authorization") String token) {
        LOG.info("get all results for user");
        LOG.info("this is the header token: " + token);
        return resultsService.getResultsByName(jwtutils.extractUserName(token));
    }

    @PostMapping(path = "")
    public void sendLetterResultToBackendForThisUser(@RequestBody LetterObject letter, @RequestHeader("Authorization") String token) {
        LOG.info("send one letter: " + letter + ", result for user " + jwtutils.extractUserName(token) + "to backend");
        resultsService.sentLetterResultToDB(letter.getLetter(), jwtutils.extractUserName(token));
    }

}



