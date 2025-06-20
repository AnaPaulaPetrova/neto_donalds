PGDMP  ,                    }            netodonalds    17.4    17.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                        0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false                       1262    16587    netodonalds    DATABASE     �   CREATE DATABASE netodonalds WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE netodonalds;
                     postgres    false            �            1259    16602    fillings    TABLE     �   CREATE TABLE public.fillings (
    id integer NOT NULL,
    id_foods integer NOT NULL,
    nome character varying,
    price real
);
    DROP TABLE public.fillings;
       public         heap r       postgres    false            �            1259    16595    foods    TABLE     c   CREATE TABLE public.foods (
    id integer NOT NULL,
    name character varying,
    preco real
);
    DROP TABLE public.foods;
       public         heap r       postgres    false            �            1259    16615    payment    TABLE     �   CREATE TABLE public.payment (
    id integer NOT NULL,
    id_foods integer,
    cpf character varying(16),
    pay_date date,
    description character varying(120),
    price real
);
    DROP TABLE public.payment;
       public         heap r       postgres    false            �            1259    16614    payment_id_seq    SEQUENCE     �   CREATE SEQUENCE public.payment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.payment_id_seq;
       public               postgres    false    220                       0    0    payment_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.payment_id_seq OWNED BY public.payment.id;
          public               postgres    false    219            _           2604    16618 
   payment id    DEFAULT     h   ALTER TABLE ONLY public.payment ALTER COLUMN id SET DEFAULT nextval('public.payment_id_seq'::regclass);
 9   ALTER TABLE public.payment ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    220    219    220            �          0    16602    fillings 
   TABLE DATA           =   COPY public.fillings (id, id_foods, nome, price) FROM stdin;
    public               postgres    false    218   3       �          0    16595    foods 
   TABLE DATA           0   COPY public.foods (id, name, preco) FROM stdin;
    public               postgres    false    217   �       �          0    16615    payment 
   TABLE DATA           R   COPY public.payment (id, id_foods, cpf, pay_date, description, price) FROM stdin;
    public               postgres    false    220   �                  0    0    payment_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.payment_id_seq', 14, true);
          public               postgres    false    219            c           2606    16608    fillings fillings_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.fillings
    ADD CONSTRAINT fillings_pkey PRIMARY KEY (id, id_foods);
 @   ALTER TABLE ONLY public.fillings DROP CONSTRAINT fillings_pkey;
       public                 postgres    false    218    218            a           2606    16601    foods foods_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.foods
    ADD CONSTRAINT foods_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.foods DROP CONSTRAINT foods_pkey;
       public                 postgres    false    217            e           2606    16620    payment payment_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.payment DROP CONSTRAINT payment_pkey;
       public                 postgres    false    220            f           2606    16609    fillings fillings_id_foods_fkey    FK CONSTRAINT        ALTER TABLE ONLY public.fillings
    ADD CONSTRAINT fillings_id_foods_fkey FOREIGN KEY (id_foods) REFERENCES public.foods(id);
 I   ALTER TABLE ONLY public.fillings DROP CONSTRAINT fillings_id_foods_fkey;
       public               postgres    false    4705    218    217            g           2606    16621    payment payment_id_foods_fkey    FK CONSTRAINT     }   ALTER TABLE ONLY public.payment
    ADD CONSTRAINT payment_id_foods_fkey FOREIGN KEY (id_foods) REFERENCES public.foods(id);
 G   ALTER TABLE ONLY public.payment DROP CONSTRAINT payment_id_foods_fkey;
       public               postgres    false    220    4705    217            �   k   x�M���0Cg�c*�P��r����� B����l(�����W�f��Y�=%�����-g�6C���o�b}�zg��@�ٔjf�'/6�l𮕆���/*'"7� ;      �   '   x�3�I,��ON�4�32�2�t.�J.��4����� ���      �   �   x�m��� �sy
^@BKQx��v�b'n�˞~�Kt�����H������s7�!ɐ�r�s�P++�N�����[��%A]�/�k��QN�������[�϶y���(Ŵ'@Z�!4�w�iy8f����P2eñ���+͋�ʗ\�ab2���h���FF�     