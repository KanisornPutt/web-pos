package application;

import logic.entity.agent.Brimstone;
import logic.entity.agent.Omen;
import logic.entity.base.BaseEntity;
import logic.entity.base.Agent;
import logic.entity.agent.Skye;
import logic.entity.skills.Skill;

import java.util.ArrayList;
import java.util.Scanner;

public class MainTerminal {
    private static Scanner keyBoard;

    private static boolean isGameActive;

    private static ArrayList<Agent> agents = new ArrayList<Agent>();
//    private static ArrayList<Counter> kitchenList;

    public static void main(String[] args) {
        // TODO Auto-generated method stub

        keyBoard = new Scanner(System.in);
        boolean run = true;
        while(run){
            System.out.println("=============================");
            System.out.println("Welcome to");
            System.out.println("No Russian");
            System.out.println("=============================");
//            System.out.println("What are you doing?");
            System.out.println("1) Start Game");
            System.out.println("2) Quit");
            System.out.println("=============================");
            int results = getChoice();

            if(results==1) {
                startGame();
            }else if(results==2){
                break;
            }else {
                System.out.println("Invalid Input, Terminate the game.");
                break;
            }
            run = false;
        }
    }
    //======================================================================
    public static int getChoice() {
        System.out.print(">> ");
        String input = keyBoard.nextLine();
        try{
            return Integer.parseInt(input);
        }catch(NumberFormatException e){
            return -1;
        }
    }
    //======================================================================

    public static void startGame() {
        isGameActive = true;

        agents.add(new Skye());
        agents.add(new Omen());
        agents.add(new Brimstone());

        int choice;

        while(isGameActive) {
            System.out.println("=============================");
            System.out.println("Heroes in game: ");
            //Print heroes
            printArrayList(agents);

            System.out.println("=============================");
            System.out.println("Who are you going to interact with?");
            System.out.println("=============================");

            // Get Hero
            choice = getChoice();
            if(choice>0&&choice< agents.size()+1) {
                // Loop until action is done (Loop in turn)
                while (true) {
                    System.out.println("=============================");
                    Agent selected = agents.get(choice - 1);
                    System.out.println("(" + choice + ") " + selected + "selected");
                    System.out.println("Choose your action");
                    System.out.println("<1> Attack (Using " + selected.getWeapon() + ", dmg: " + selected.getWeapon().getDamage() + ")");
                    System.out.println("<2> Use skill");
                    System.out.println("<3> Cancel"); // will remove later
                    System.out.println("=============================");
                    int action;
                    action = getChoice();
                    //Attack
                    if (action == 1) {
                        System.out.println("=============================");
                        printArrayList(agents);
                        System.out.println((agents.size() + 1) + ") Cancel");
                        System.out.println("=============================");
                        System.out.println("Select your target");
                        int target = getChoice();
                        if (target == choice)
                            System.out.println("You cannot attack yourself");
                        else if (target == agents.size() + 1) {
                            continue;
                        } else {
                            selected.attack(agents.get(target - 1));
                            break;
                        }
                    } else if (action == 2) {
                        System.out.println("=============================");
                        System.out.println("1) " + selected.getSkill1() );
                        System.out.println("2) " + selected.getSkill2() );
                        System.out.println("3) Cancel");
                        System.out.println("=============================");
                        int s = getChoice();
                        Skill skill = selected.getSkill1();
                        if (s == 1) skill = selected.getSkill1();
                        else if (s == 2) skill = selected.getSkill2();
                        System.out.println("=============================");
                        printArrayList(agents);
                        System.out.println("=============================");
                        System.out.println("Select your target");
                        int target = getChoice();
                        skill.perform(agents.get(target - 1));
                        break;
                    } else if (action == 3) {
                        break;
                    }
                }

            }else{
                System.out.println("Invalid Choice");
            }
            for (Agent a: agents) a.update();
        }
//            processUpdate();

            System.out.println("=============================");
    }
    //======================================================================

    public static <T> void printArrayList(ArrayList<T> arrayList) {
        for(int i=0;i<arrayList.size();i++) {
            T member = arrayList.get(i);
            if (member instanceof BaseEntity) {
                if (!((BaseEntity) member).isAlive()) {
                    System.out.println( (i+1)+") " + ((BaseEntity) member).getName() + " (Dead)");
                    continue;
                }
            }
            System.out.println((i+1)+") "+member);
        }
    }
}
