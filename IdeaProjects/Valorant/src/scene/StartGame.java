package scene;

import component.SquareButton;
import javafx.scene.Group;

public class StartGame extends Group{
    public StartGame(){
        //start button;
        SquareButton start = new SquareButton("START");
        start.setLayoutX(320);
        start.setLayoutY(550);
        //option button;
        SquareButton option = new SquareButton("OPTION");
        option.setLayoutX(740);
        option.setLayoutY(550);
        getChildren().addAll(start,option);
    }

}
