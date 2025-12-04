import { services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function ServicesSection() {
  return (
    <section id="services" className="bg-secondary py-16 md:py-24">
      <div className="container">
        <div className="text-center">
          <h2 className="font-headline text-3xl font-bold text-primary md:text-4xl">What I Do</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/80 md:text-lg">
            I offer a range of services to help you achieve your digital goals.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.title} className="text-center transition-transform hover:scale-105 hover:shadow-lg">
                <CardHeader>
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="pt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
