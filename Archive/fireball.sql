drop table fireball;

create table fireball (
    peak_brightness timestamp without time zone,
    latitude numeric,
    longitude numeric,
    altitude numeric,
    velocity numeric,
    vx numeric,
    vy numeric,
    vz numeric,
    total_radiated_energy bigint,
    calculated_total_impact_energy numeric NOT NULL);