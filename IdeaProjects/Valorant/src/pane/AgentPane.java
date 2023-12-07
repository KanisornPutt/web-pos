package pane;

import component.CharactorIcon;
import javafx.geometry.Insets;
import javafx.scene.layout.TilePane;

import java.util.ArrayList;

public class AgentPane extends TilePane {
    private ArrayList<CharactorIcon> agentselectpanel;
    private int currentbox;
    public AgentPane(){
        //setPadding(new Insets(20,20,20,20));
        setHgap(20);
        ArrayList<CharactorIcon> arr = new ArrayList<>();
        agentselectpanel = arr;
        for(int i = 1;i<5;i++){
            CharactorIcon icon = new CharactorIcon("image/"+i +".png");
            agentselectpanel.add(agentselectpanel.size(),icon);
        }
        for(CharactorIcon x : agentselectpanel){
            getChildren().add(x);
        }
        setCurrentbox(0);
    }
    public void moveToRight(){
        setCurrentbox((getCurrentbox()+1)%getAgentselectpanel().size());
    }
    public void moveToLeft(){
        setCurrentbox((getCurrentbox()-1+getAgentselectpanel().size())%getAgentselectpanel().size());

    }

    public int getCurrentbox() {
        return currentbox;
    }

    public void setCurrentbox(int currentbox) {
        this.currentbox = currentbox;
    }

    public ArrayList<CharactorIcon> getAgentselectpanel() {
        return agentselectpanel;
    }
}
