package ca.mdzheng.backend.controller;

import ca.mdzheng.backend.service.PredictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
public class PredictController {

    private final PredictService predictService;

    @Autowired
    public PredictController(PredictService predictService) {
        this.predictService = predictService;
    }

    @CrossOrigin(origins="*")
    @PostMapping(path = "/api/v1/predict")
    public String getPrediction(@RequestBody String imageData) {
        return predictService.predict(imageData);
    }

}
