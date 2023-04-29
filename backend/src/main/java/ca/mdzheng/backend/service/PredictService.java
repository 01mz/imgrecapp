package ca.mdzheng.backend.service;

import ca.mdzheng.backend.processing.RPCClient;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

@Service
public class PredictService {
    public String predict(String imageData) {
        String result = "";
        try (RPCClient rpcClient = new RPCClient()) {
            var arg = new JSONObject();
            arg.put("imageData", imageData);

            String body = rpcClient.call(arg.toString());
            var response = new JSONObject(body);

            result = response.getString("result");
            System.out.println(result);

        } catch (IOException | TimeoutException | InterruptedException e) {
            e.printStackTrace();
        }
        return result;
    }
}

