Como parte de la catedra de Ingeniería de Software, desarrollamos una plataforma de comercio centroamericana.

Para este proyecto escogimos la arquitectura micro kernel, centralizando los aspectos que las naciones centroamericas tienen bajo mutuo acuerdo en el kernel (como la categorización de la mercancia, y el registro de los usuarios), y permitiendo a cada país el desarrollo de un plugin propio para implementar los por menores de la logistica como ellos deseen, tanto en terminos de lógica como implementación.

Los componentes del software son:

  -front-core(https://github.com/robCastro/front-core): Encargado de la presentación del mismo.
  
  -core(https://github.com/robCastro/core): Centraliza los aspectos de mutuo acuerdo entre naciones, así como la implementación de comunicación con los plugins.
  
  -plugin-a(https://github.com/robCastro/plugin_a): Plugin de ejemplo, encargado de realizar la implementación de aranceles y multas bajo cierta estructura de tablas.
  
  -plugin-b(https://github.com/robCastro/plugin_b): Plugin de ejemplo, contrasta con plugin a cambiando no solo los valores de los aranceles, si no que además, la estructura de tablas.
