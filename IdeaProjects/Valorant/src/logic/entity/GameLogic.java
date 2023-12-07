package logic.entity;

import logic.entity.base.Agent;

import java.util.ArrayList;
import java.util.List;

public class GameLogic {
    private List<Agent> allagent;
    private List<Agent> player1agent;
    private List<Agent> player2agent;
    private GameLogic instance = null;
    public GameLogic(){
        this.allagentingame = new ArrayList<>();
        this.player1agent = new ArrayList<>();
        this.player2agent = new ArrayList<>();
    }

    public GameLogic getInstance() {
        if(instance == null){
            instance = new GameLogic();
        }
        return instance;
    }
    public void clearInstance(){
        instance = null;
    }
    public void addAgent(Agent agent){
        if(allagent.size()<6){
            allagent.add(agent);
        }
    }

    public List<Agent> getPlayer1agent() {
        return player1agent;
    }

    public List<Agent> getPlayer2agent() {
        return player2agent;
    }

    public void setPlayer1agent(List<Agent> player1agent) {
        this.player1agent = player1agent;
    }

    public void setPlayer2agent(List<Agent> player2agent) {
        this.player2agent = player2agent;
    }
}
