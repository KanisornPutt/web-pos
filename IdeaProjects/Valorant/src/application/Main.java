package application;

import component.SquareButton;
import javafx.application.Application;
import javafx.event.EventHandler;
import javafx.geometry.Pos;
import javafx.scene.Group;
import javafx.scene.Scene;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import pane.AgentPane;
import scene.StartGame;

public class Main extends Application {
    private Scene startgame;
    private Group startgamecomponent;
    private Scene agentselect;
    private BorderPane agentselectcomponent;
    private Scene ingame;
    private Stage stage;

    private ImageView myImageView;

    @Override
    public void start(Stage Primarystage) throws Exception {
        stage = Primarystage;
        Group root = new StartGame();
        String image_path = ClassLoader.getSystemResource("image/valo.png").toString();
        myImageView = new ImageView(new Image(image_path));
        stage.getIcons().add(new Image(image_path));
        createAgentSelect();
        createStartGame();
        stage.setScene(startgame);
        stage.show();
    }
    private Scene createStartGame(){
        Group group = new Group();
        startgamecomponent = group;
        Scene scene = new Scene(startgamecomponent,1280,720, Color.BLACK);
        startgame = scene;
        myImageView.setLayoutX(490);
        myImageView.setLayoutY(100);
        myImageView.setPreserveRatio(true);
        myImageView.setFitWidth(300);
        //start button;
        SquareButton start = new SquareButton("START");
        start.setLayoutX(320);
        start.setLayoutY(550);
        start.setOnMouseClicked(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent mouseEvent) {
                switchScene(agentselect);
            }
        });
        //option button;
        SquareButton option = new SquareButton("OPTION");
        option.setLayoutX(740);
        option.setLayoutY(550);
        startgamecomponent.getChildren().addAll(start,option,myImageView);
        return startgame;
    }
    private Scene createAgentSelect(){
        BorderPane borderPane = new BorderPane();
        agentselectcomponent = borderPane;
        Scene scene = new Scene(agentselectcomponent,1280,720, Color.BLACK);
        agentselect = scene;
        Text text = new Text("                 Agent Select");
        text.setFont(Font.font(90));
        text.setFill(Color.WHITE);
        agentselectcomponent.setTop(text);
        AgentPane agentPane = new AgentPane();
        agentPane.setAlignment(Pos.CENTER);
        agentselectcomponent.setBottom(agentPane);
        //----------------start---------------------//
        SquareButton start = new SquareButton("START");
        start.setLayoutX(1100);
        start.setLayoutY(650);
        start.setOnMouseClicked(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent mouseEvent) {
                switchScene(agentselect);
            }
        });
        //---------------back-----------------------//
        SquareButton back = new SquareButton("BACK");
        back.setLayoutX(180);
        back.setLayoutY(650);
        back.setOnMouseClicked(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent mouseEvent) {
                switchScene(startgame);
            }
        });
        agentselectcomponent.getChildren().addAll(start,back);
        return agentselect;
    }
    private void switchScene(Scene scene){
        stage.setScene(scene);
        stage.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
