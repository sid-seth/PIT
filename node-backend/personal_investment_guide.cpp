#include<Iostream>
#include<Vector>
#include<Map>
#include<algorithm>
#include<unordered_map>
#include<istream>
#include<ostream>
#include<fstream>
#include<string>
#include<Stdio.h>
#include <iomanip> 
#include<chrono>
#include <sstream>
#include<math.h>
#include <cstdlib>

using namespace std;

class Transaction {
protected:
    double amount;
    string description;

public:
    Transaction() : amount(0), description("") {}
    Transaction(double amt, const string &des){
        amount = amt;
        description = des;
    }

    virtual void display() {
        cout << setw(15) << amount << setw(20) << description << endl;
    }

    void save(ofstream& out) const {
        out << amount << "," << description << endl;
    }
    void load(const string& line) {
        size_t pos = line.find(',');
        amount = stod(line.substr(0, pos));
        description = line.substr(pos + 1);
    }
   





};

class Income : public Transaction {
public:
    Income(double amt, const string& des) : Transaction(amt, des) {}

    void display() {
        cout << setw(15) << "Income" << setw(20);
        Transaction::display();
    }
};

class Expenditure : public Transaction {
public:
    Expenditure(double amt, const string &des) : Transaction(amt, des) {}

    void display() {
        cout << setw(15) << "Expenditure" << setw(20);
        Transaction::display();
    }
};

class Investment {
protected:
    double amount;
    int duration;

public:
    Investment() : amount(0), duration(0) {}
    
    Investment(double amt, int dur) {
        amount = amt;
        duration = dur;
    }

    virtual void display() {
        cout << setw(15) << amount << setw(15) << duration;
    }
    void save(ofstream& out) const {
        out << amount << "," << duration << endl;
    }
    void load(const string& line) {
        size_t pos = line.find(',');
        amount = stod(line.substr(0, pos));
        duration = stoi(line.substr(pos + 1));
    }
    virtual double maturityAmount() {
        return amount;
    }
};

class SIP : public Investment {
private:
    double monthly;

public:
    SIP(double amt, int dur, double monAmt) : Investment(amt, dur) {
        monthly = monAmt;
    }

    void display() {
        cout << setw(15) << "SIP";
        Investment::display();
        cout << setw(20)<<monthly << endl;
    }

    double maturityAmount() {
        double final = amount * pow(1 + (0.096/12), duration*12);
        return final + (monthly * 12 * duration);
    }
};

class FD : public Investment {
public:
    FD(double amt, int dur) : Investment(amt, dur) {}

    void display() {
        cout << setw(15) << "FD";
        Investment::display();
        cout << endl;
    }

    double maturityAmount() {
        return amount * pow((1 + 0.071), duration);
    }
};

std::string getCurrentDate() {
    // Get the current time as a time_point
    auto now = std::chrono::system_clock::now();

    // Convert the time_point to time_t
    std::time_t now_time = std::chrono::system_clock::to_time_t(now);

    // Convert the time_t to tm struct
    std::tm now_tm = *std::localtime(&now_time);

    // Create a stringstream to format the date
    std::stringstream ss;
    ss << std::put_time(&now_tm, "%Y-%m-%d");

    // Convert the stringstream to a string
    return ss.str();
}
class ETF : public Investment {
    protected:
    string description;
    string date=getCurrentDate();
    public:
        ETF(double amt, int dur,string dt,string des) : Investment(amt,dur) {
            des=description;
            
        }
    
        void display() {
            cout << setw(15) << "ETF";
            Investment::display();
            cout << endl;
        }
    
        double maturityAmount() {
            double final = amount * pow(1 + (0.096/12), duration*12);
            return final + (amount * 12 * duration);
        }
    };


class FinanceManager {
public:
    // Transaction* transactions[100];
    vector<Transaction*>transactions;
    vector<Investment*>investments;
    
    // Investment* investments[50];
    int tcount;
    int icount;

    FinanceManager() {
        tcount = 0;
        icount = 0;
    }

    void addTransaction(Transaction* t) {
        transactions.push_back(t);
        tcount++;
    }

    void addInvestment(Investment* i) {
        investments.push_back(i);
        icount++;
    }
    

    void displayRecord(double balance) {
        cout << "-----------------------------------\n";
        cout << "|        Personal Finance        |\n";
        cout << "-----------------------------------\n";

        cout << "\n||--BALANCE--: " << balance << "||" << endl;

        cout << "\n--SAVINGS--: \n";
        cout << setw(15) << "Type"<<setw(15)<<"Amount" << setw(20) << "Description" << endl;
        for (int i = 0; i < tcount; i++) {
            transactions[i]->display();
        }

        cout << "\n--INVESTMENTS--\n";
        cout << setw(15) << "Type" << setw(15) << "Amount" << setw(15) << "Duration"<<setw(30)<<"Monthly amount invested"<<endl;
        for (int i = 0; i < icount; i++) {
            investments[i]->display();
        }
    }
};

class   User {
public:
    FinanceManager manager;
    double balance;

    User(double initialBalance) {
        balance = initialBalance;
    }
    template <typename T>
void saveData(const std::vector<T*>& data, const std::string& filename) {
    std::ofstream outFile(filename);
    if (!outFile) {
        std::cerr << "Error opening file for writing." << std::endl;
        return;
    }

    for (const T* element : data) {
        if (element) {
            element->save(outFile);
        }
    }
    outFile.close();
}

    // void saveData(const vector<Transaction*>& data, const string& filename) {
    //     ofstream outFile(filename);
    //     if (!outFile) {
    //         cerr << "Error opening file for writing." << endl;
    //         return;
    //     }
    
    //     for (const Transaction* element : data) {
    //         if (element) {
    //             element->save(outFile);
    //         }
    //     }
    //     outFile.close();
    // }
    // void saveData(const vector<Investment*>& data, const string& filename) {
    //     ofstream outFile(filename);
    //     if (!outFile) {
    //         cerr << "Error opening file for writing." << endl;
    //         return;
    //     }
    
    //     for (const Investment* element : data) {
    //         if (element) {
    //             element->save(outFile);
    //         }
    //     }
    //     outFile.close();
    // }

    // 
    
    

template <typename T>
void loadData(std::vector<T*>& data, const std::string& filename) {
    static_assert(std::is_default_constructible<T>::value, "T must have a default constructor");

    std::ifstream inFile(filename);
    if (!inFile) {
        std::cerr << "Error opening file for reading." << std::endl;
        return;
    }

    std::string line = "";
    while (std::getline(inFile, line)) {
        T* element = new T(); // Assuming T has a default constructor
        element->load(line);
        data.push_back(element);
    }
    inFile.close();
}



    
    void operations() {
        
        int choice = -1;
        int i=1;
        while (choice != 0) {
            if(i==1)
            {

                cout << "\n--OPTIONS--\n";
                cout << "1. Record INCOME\n";
                cout << "2. Record EXPENDITURE\n";
                cout << "3. Make Investment\n";
                cout << "4. Finance Information\n";
                cout << "5. Investment Information\n";
                cout << "6. save data\n";
                cout << "7. load data\n";
                cout << "0. Exit\n";
                cout << "Enter choice : END";
                i=2;
            }
            cin >> choice;

            switch (choice) {
                case 1: {
                    double amt;
                    string desc;
                    cout << "Enter amount : ";
                    cin >> amt;
                    cout << "description";
                    cin.ignore();
                    getline(cin, desc);
                    manager.addTransaction(new Income(amt, desc));
                    balance += amt;
                    break;
                }

                case 2: {
                    double amt;
                    string desc;
                    cout << "Enter amount: ";
                    cin >> amt;
                    if (balance - amt < 1000) {
                        cout << "Error: Balance cannot go below 1000." << endl;
                        continue;
                    }
                    cin.ignore();
                    cout << "Enter description: ";
                    getline(cin, desc);
                    manager.addTransaction(new Expenditure(amt, desc));
                    balance -= amt;
                    break;
                }

                case 3: {
                    makeInvestment();
                    break;
                }

                case 4: {
                    manager.displayRecord(balance);
                    break;
                }

                case 5: {
                    cout << "--MATURITY AMOUNTS--||\n";
                    for (int i = 0; i < manager.icount; i++) {
                        Investment* inv = manager.investments[i];
                        cout << "\nInvestment " << i + 1 << " : " << inv->maturityAmount() << " Rs" << endl;
                        cout<<setw(15)<<"Type"<<setw(15)<<"Amount"<<setw(20)<<"Duration"<<setw(30)<<"Monthly amount invested"<<endl;
                        inv->display();
                    }
                    break;
                }
                case 6:{
                    cout<<"SAVE data";
                    
                    vector<Transaction*> db1 = manager.transactions;
                    saveData(db1, "transactions.csv");
                    vector<Investment*> db2 = manager.investments;
                    saveData(db2, "investments.csv");




                   
                }
                case 7:{
                   
                    cout<<"Load Data";
                    manager.transactions={};

                    loadData(manager.transactions, "transactions.csv");
                    for(auto it: manager.transactions)
                    {
                        it->display();
                    }
                    manager.investments={};

                    loadData(manager.investments, "investments.csv");
                    for(auto it: manager.investments)
                    {
                        it->display();
                    }

                }

                case 0:
                    break;

                default:
                    cout << "\nNo such option:(";
                    break;
            }
        }
    }

    void makeInvestment() {
        int sub = -1;
        while (sub != 5) {
            cout << "\nWhich one:\n";
            cout << "1. SIP\n";
            cout << "2. FD\n";
            cout << "0. Go back\n";
            cout << "Enter your choice : ";
            cin >> sub;

            switch (sub) {
                case 1: {
                    double amt, monthly;
                    int dur;
                    cout << "Enter amount : ";
                    cin >> amt;
                    if (balance - amt < 1000) {
                        cout << "ERROR : Min Balance=1000";
                        return;
                    }
                    cout << "Enter duration in yrs : ";
                    cin >> dur;
                    cout << "Enter monthly investment amount : ";
                    cin >> monthly;
                    manager.addInvestment(new SIP(amt, dur, monthly));
                    balance -= amt;
                    break;
                }

                case 2: {
                    double amt;
                    int dur;
                    cout << "Enter amount : ";
                    cin >> amt;
                    if (balance - amt < 1000) {
                        cout << "ERROR: Min Balance=1000";
                        return;
                    }
                    cout << "Enter duration in yrs : ";
                    cin >> dur;
                    manager.addInvestment(new FD(amt, dur));
                    balance -= amt;
                    break;
                }
                
                case 3: {
                    double amt;
                    int dur;
                    string des;
                    string dt;
                    cout << "Enter amount : ";
                    cin >> amt;
                    if (balance - amt < 1000) {
                        cout << "ERROR: Min Balance=1000";
                        return;
                    }
                    cout << "Enter duration in months : ";
                    cin >> dur;
                    cout << "Enter description name of the ETF and pe and pb ratios as well: ";
                    cin >> des;
                   
                    manager.addInvestment(new ETF(amt, dur,dt,des));
                    balance -= amt;
                    break;
                }
                case 4:{
                    system("python decision.py");
                }

                case 5:

                    
                    break;

                default:
                    cout << "Invalid choice.";
                    break;
            }
        }
    }
};



int main() {
    cout << "---Welcome to Finance Management System!!---\n";
    int bal=0;
    User user(bal); //create user with initial balance 2000
    user.operations();

    return 0;
}