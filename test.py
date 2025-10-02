# Ein neues Tier hinzufügen
neues_tier = input("Name des Tieres: ")
neues_geraeusch = input(f"Welches Geräusch macht das {neues_tier}? ")

tiere[neues_tier] = neues_geraeusch  # Zum Wörterbuch hinzufügen

# Aktualisierte Liste ausgeben
for tier, laut in tiere.items():
    print(f"Das {tier} macht '{laut}'.")