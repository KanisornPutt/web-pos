package component;

import javafx.event.EventHandler;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;
import javafx.scene.text.Font;
import javafx.scene.text.Text;

public class SquareButton extends StackPane {
    private Rectangle inside;
    private Rectangle outside;
    public SquareButton(String name){
        Rectangle backrectangle = new Rectangle(220,95,Color.DARKGRAY);
        outside = backrectangle;
        Rectangle rectangle = new Rectangle(200,75, Color.GRAY);
        inside = rectangle;
        Text text = new Text(name);
        text.setFont(Font.font(50));
        this.getChildren().addAll(backrectangle,rectangle,text);
        setOnMouseEntered(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent mouseEvent) {
                setActive(true);
            }
        });
        setOnMouseExited(new EventHandler<MouseEvent>() {
            @Override
            public void handle(MouseEvent mouseEvent) {
                setActive(false);
            }
        });
    }
    public void setActive(boolean value){
        if(value){
            inside.setFill(Color.LIGHTGRAY);
            outside.setFill(Color.GRAY);
        }else{
            inside.setFill(Color.GRAY);
            outside.setFill(Color.DARKGRAY);
        }

    }
}
