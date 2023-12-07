package component;

import javafx.event.EventHandler;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.StackPane;
import javafx.scene.paint.Color;
import javafx.scene.shape.Rectangle;

public class CharactorIcon extends StackPane {
    public Rectangle rectangle;
    public ImageView imageView;
    public CharactorIcon(String image) {
        try{
        Rectangle newrectangle = new Rectangle(100,100, Color.GRAY);
        rectangle = newrectangle;
        //charactor icon
            String image_path = ClassLoader.getSystemResource(image).toString();
            ImageView newimageView = new ImageView(new Image(image_path));
            imageView = newimageView;
            imageView.setPreserveRatio(true);
            imageView.setFitWidth(80);
            getChildren().addAll(rectangle, imageView);
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
        }catch (Exception e){
            System.out.println("kuy");
        }
    }
    public void setActive(boolean value){
        if(value){
            rectangle.setFill(Color.LIGHTGRAY);
        }else{
            rectangle.setFill(Color.GRAY);
        }

    }
}
