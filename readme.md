# CliniShare

El sistema distribuido de gestión de historias clínicas y colaboración médica.

    Con el sistema se puede:
*   Gestionar historias clínicas de manera segura sin uso de internet.

*   Registrar a tus pacientes y eventos que les vayan ocurriendo.

*   Resguardar los datos de tus pacientes bajo contraseña, en tu computadora, sin servidores de por medio.

*   Compartir los datos de pacientes que tengas en común con otros profesionales de la salud.

*   Y muchas otras cosas más.

## Arrancando con el sistema

Con estas simples instrucciones vas poder gestionar historias clínicas y tener tu copia de Clinishare andando lo antes posible.


### Prerequisitos

```
Sistema operativo Ubuntu Linux o WSL con Ubuntu Linux versión 2 o superior.

Una versión de node mayor a la 16.

Git
```

### Instalación

Como arrancar paso a paso:

Node:

```
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash - &&\

sudo apt-get install -y nodejs
```

Clonando el repositorio:

```
git clone https://github.com/jonathanc0101/CliniShare.git
```

Instalando las dependencias:

```
cd ./CliniShare

sh ./install.sh
```

Corriendo el sistema:
```
sh ./run.sh
```





Suerte y que te diviertas usando el sistema!