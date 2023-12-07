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
import javafx.scene.layout.*;
import javafx.scene.paint.Color;
import javafx.scene.text.Font;
import javafx.scene.text.Text;
import javafx.stage.Stage;
import pane.AgentPane;
import scene.StartGame;

public class Main extends Application {
    private Scene startgame;
    private VBox startgamecomponent;
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
        startgamecomponent = new VBox();
        Scene scene = new Scene(startgamecomponent,1280,720, Color.BLACK);
        startgamecomponent.setSpacing(100);
        startgamecomponent.setAlignment(Pos.CENTER);
        HBox hBox = new HBox();
        hBox.setAlignment(Pos.BOTTOM_CENTER);
        hBox.setSpacing(300);
        startgame = scene;
        myImageView.setLayoutX(490);
        myImageView.setLayoutY(100);
        myImageView.setPreserveRatio(true);
        myImageView.setFitWidth(300);
        //start button;
        SquareButton start = new SquareButton("START");
        //start.setLayoutX(320);
        //start.setLayoutY(550);
        start.setOnMouseClicked(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent mouseEvent) {
                switchScene(agentselect);
            }
        });
        //option button;
        SquareButton option = new SquareButton("OPTION");
        //option.setLayoutX(740);
        //option.setLayoutY(550);
        hBox.getChildren().addAll(option,start);
        startgamecomponent.getChildren().addAll(myImageView,hBox);
        return startgame;
    }
    private Scene createAgentSelect(){
        BorderPane borderPane = new BorderPane();
        HBox hBox = new HBox();
        agentselectcomponent = borderPane;
        Scene scene = new Scene(agentselectcomponent,1280,720, Color.BLACK);
        agentselect = scene;
        Text text = new Text("Agent Select");
        text.setFont(Font.font(90));
        text.setFill(Color.WHITE);
        agentselectcomponent.setTop(text);
        AgentPane agentPane = new AgentPane();
        agentPane.setAlignment(Pos.CENTER);
        //----------------start---------------------//
        SquareButton start = new SquareButton("START");
        start.setOnMouseClicked(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent mouseEvent) {
                switchScene(agentselect);
            }
        });
        //---------------back-----------------------//
        SquareButton back = new SquareButton("BACK");
        back.setOnMouseClicked(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent mouseEvent) {
                switchScene(startgame);
            }
        });
        //---------------get_children----------------//
        hBox.getChildren().addAll(back,agentPane,start);
        hBox.setAlignment(Pos.CENTER);
        agentselectcomponent.setBottom(hBox);
        BorderPane.setAlignment(text,Pos.CENTER);
        //agentselectcomponent.getChildren().addAll(start,back);
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
